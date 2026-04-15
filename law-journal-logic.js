function normalizeDateValue(dateValue) {
  if (!dateValue) return Number.POSITIVE_INFINITY;
  const timestamp = new Date(`${dateValue}T00:00:00+09:00`).getTime();
  return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
}

function makeId(prefix = 'item') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function parseJsonArray(raw, fallback = []) {
  if (!raw) return [...fallback];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...fallback];
  } catch {
    return [...fallback];
  }
}

export function parseChecklistItems(raw = '') {
  if (!raw.trim()) return [];
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith('[x] ')) return { id: null, text: line.slice(4), done: true };
      if (line.startsWith('[ ] ')) return { id: null, text: line.slice(4), done: false };
      return { id: null, text: line, done: false };
    });
}

export function serializeChecklistItems(items = []) {
  return items
    .filter((item) => item && item.text && item.text.trim())
    .map((item) => `${item.done ? '[x]' : '[ ]'} ${item.text.trim()}`)
    .join('\n');
}

export function normalizeTaskItem(item, prefix = 'task') {
  if (!item || !item.text || !item.text.trim()) return null;
  return {
    id: item.id || makeId(prefix),
    text: item.text.trim(),
    done: Boolean(item.done),
    dueDate: item.dueDate || '',
    assignee: item.assignee || '',
    sourceDate: item.sourceDate || '',
    createdAt: item.createdAt || '',
  };
}

export function sortChecklistByDueDate(items = []) {
  return [...items].sort((a, b) => {
    const dueCompare = normalizeDateValue(a.dueDate) - normalizeDateValue(b.dueDate);
    if (dueCompare !== 0) return dueCompare;
    return (a.text || '').localeCompare(b.text || '', 'ko');
  });
}

export function carryForwardTomorrowTasks(entries = {}, targetDate) {
  const current = parseJsonArray(entries[targetDate]?.todayTasks).map((item) => normalizeTaskItem(item, 'today')).filter(Boolean);
  const existingTexts = new Set(current.map((item) => item.text));

  const previousDates = Object.keys(entries)
    .filter((dateKey) => dateKey < targetDate)
    .sort((a, b) => b.localeCompare(a));

  previousDates.forEach((dateKey) => {
    const tomorrowTasks = parseJsonArray(entries[dateKey]?.tomorrowTasks)
      .map((item) => normalizeTaskItem(item, 'tomorrow'))
      .filter(Boolean);

    tomorrowTasks.forEach((item) => {
      if (item.done || existingTexts.has(item.text)) return;
      existingTexts.add(item.text);
      current.push({ ...item, sourceDate: item.sourceDate || dateKey, done: false });
    });
  });

  return sortChecklistByDueDate(current);
}

export function carryForwardPendingDocs(entries = {}, targetDate) {
  const current = parseJsonArray(entries[targetDate]?.pendingDocItems)
    .map((item) => normalizeTaskItem(item, 'pending-doc'))
    .filter(Boolean);
  const existingTexts = new Set(current.map((item) => item.text));

  const previousDates = Object.keys(entries)
    .filter((dateKey) => dateKey < targetDate)
    .sort((a, b) => b.localeCompare(a));

  previousDates.forEach((dateKey) => {
    const pendingDocs = parseJsonArray(entries[dateKey]?.pendingDocItems)
      .map((item) => normalizeTaskItem(item, 'pending-doc'))
      .filter(Boolean);

    pendingDocs.forEach((item) => {
      if (item.done || existingTexts.has(item.text)) return;
      existingTexts.add(item.text);
      current.push({ ...item, sourceDate: item.sourceDate || dateKey, done: false });
    });
  });

  return sortChecklistByDueDate(current);
}

export function sortDelegatedTasks(items = []) {
  return [...items]
    .map((item) => normalizeTaskItem(item, 'delegated'))
    .filter(Boolean)
    .sort((a, b) => {
      const dueCompare = normalizeDateValue(a.dueDate) - normalizeDateValue(b.dueDate);
      if (dueCompare !== 0) return dueCompare;
      const assigneeCompare = (a.assignee || '').localeCompare(b.assignee || '', 'ko');
      if (assigneeCompare !== 0) return assigneeCompare;
      return a.text.localeCompare(b.text, 'ko');
    });
}

function normalizeLearnedItem(item, dateKey) {
  if (!item) return null;
  const title = (item.title || '').trim();
  const content = (item.content || '').trim();
  if (!title && !content) return null;
  return {
    id: item.id || makeId('learned'),
    topic: (item.topic || '미분류').trim() || '미분류',
    subtopic: (item.subtopic || '').trim(),
    title: title || '(제목 없음)',
    content,
    date: item.date || dateKey,
  };
}

function legacyLearnedToItems(raw, dateKey) {
  if (!raw || !raw.trim()) return [];
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const topicMatch = line.match(/^\[(.+?)\]\s*(.*)$/);
      const topic = topicMatch ? topicMatch[1].trim() : '미분류';
      const body = topicMatch ? topicMatch[2].trim() : line;
      const [titlePart, ...rest] = body.split(/\s*[—:-]\s*/);
      return normalizeLearnedItem({
        id: `legacy_${dateKey}_${index}`,
        topic,
        subtopic: '',
        title: titlePart || '(제목 없음)',
        content: rest.join(' — ') || body,
      }, dateKey);
    })
    .filter(Boolean);
}

export function getLearnedItemsFromEntry(entry = {}, dateKey = '') {
  const structured = parseJsonArray(entry.learnedItems)
    .map((item) => normalizeLearnedItem(item, dateKey))
    .filter(Boolean);
  if (structured.length) return structured;
  return legacyLearnedToItems(entry.learned || '', dateKey);
}

export function buildLearnedTopicGroups(entries = {}) {
  const groups = new Map();
  Object.entries(entries).forEach(([dateKey, entry]) => {
    getLearnedItemsFromEntry(entry, dateKey).forEach((item) => {
      if (!groups.has(item.topic)) groups.set(item.topic, []);
      groups.get(item.topic).push(item);
    });
  });

  return Array.from(groups.entries())
    .map(([topic, items]) => ({
      topic,
      items: items.sort((a, b) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return a.title.localeCompare(b.title, 'ko');
      }),
    }))
    .sort((a, b) => a.topic.localeCompare(b.topic, 'ko'));
}

export function buildLearnedTopicOptions(entries = {}) {
  return buildLearnedTopicGroups(entries).map((group) => group.topic);
}

export function filterLearnedItemsByTopic(entries = {}, topic = '') {
  return buildLearnedTopicGroups(entries).find((group) => group.topic === topic)?.items || [];
}


export function searchLearnedItems(entries = {}, query = '', topic = '') {
  const normalizedQuery = (query || '').trim().toLowerCase();
  const items = buildLearnedTopicGroups(entries).flatMap((group) => group.items);
  return items.filter((item) => {
    if (topic && item.topic !== topic) return false;
    if (!normalizedQuery) return true;
    return [item.topic, item.subtopic, item.title, item.content, item.date]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedQuery));
  }).sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return a.title.localeCompare(b.title, 'ko');
  });
}

export function buildLearnedArchiveStats(entries = {}, monthPrefix = '') {
  const groups = buildLearnedTopicGroups(entries);
  const items = groups.flatMap((group) => group.items);
  return {
    totalItems: items.length,
    totalTopics: groups.length,
    monthItems: monthPrefix ? items.filter((item) => item.date.startsWith(monthPrefix)).length : items.length,
    topTopic: groups.slice().sort((a, b) => b.items.length - a.items.length)[0]?.topic || '',
  };
}

if (typeof window !== 'undefined') {
  window.LawJournalLogic = {
    parseJsonArray,
    parseChecklistItems,
    serializeChecklistItems,
    normalizeTaskItem,
    sortChecklistByDueDate,
    carryForwardTomorrowTasks,
    carryForwardPendingDocs,
    sortDelegatedTasks,
    getLearnedItemsFromEntry,
    buildLearnedTopicGroups,
    buildLearnedTopicOptions,
    filterLearnedItemsByTopic,
    searchLearnedItems,
    buildLearnedArchiveStats,
  };
}
