import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseChecklistItems,
  serializeChecklistItems,
  carryForwardTomorrowTasks,
  carryForwardPendingDocs,
  sortDelegatedTasks,
  buildLearnedTopicGroups,
  searchLearnedItems,
  buildLearnedArchiveStats,
} from './law-journal-logic.js';

test('carryForwardTomorrowTasks moves unchecked tomorrow tasks into today tasks', () => {
  const entries = {
    '2026-04-14': {
      tomorrowTasks: JSON.stringify([
        { id: 'a', text: '준비서면 검토', done: false },
        { id: 'b', text: '의뢰인 통화', done: true },
      ]),
      todayTasks: JSON.stringify([]),
    },
    '2026-04-15': {
      todayTasks: JSON.stringify([{ id: 'c', text: '기존 오늘 할 일', done: false }]),
    },
  };

  const merged = carryForwardTomorrowTasks(entries, '2026-04-15');

  assert.deepEqual(merged.map((item) => item.text), ['기존 오늘 할 일', '준비서면 검토']);
  assert.equal(merged[1].sourceDate, '2026-04-14');
});

test('carryForwardPendingDocs moves unchecked pending docs into next day pending docs', () => {
  const entries = {
    '2026-04-14': {
      pendingDocItems: JSON.stringify([
        { id: 'a', text: '준비서면 제출', dueDate: '2026-04-15', done: false },
        { id: 'b', text: '의견서 제출', dueDate: '2026-04-14', done: true },
      ]),
    },
    '2026-04-15': {
      pendingDocItems: JSON.stringify([{ id: 'c', text: '기존 서면', dueDate: '', done: false }]),
    },
  };

  const merged = carryForwardPendingDocs(entries, '2026-04-15');

  assert.deepEqual(merged.map((item) => item.text), ['준비서면 제출', '기존 서면']);
  assert.equal(merged[0].sourceDate, '2026-04-14');
});

test('sortDelegatedTasks orders by nearest due date and pushes undated items last', () => {
  const tasks = [
    { id: '1', assignee: '이사무', text: '판례 조사', dueDate: '' },
    { id: '2', assignee: '김실장', text: '초안 검토', dueDate: '2026-04-18' },
    { id: '3', assignee: '박대리', text: '등본 발급', dueDate: '2026-04-16' },
  ];

  const sorted = sortDelegatedTasks(tasks);

  assert.deepEqual(sorted.map((item) => item.id), ['3', '2', '1']);
});

test('buildLearnedTopicGroups groups learned notes by topic and keeps date labels', () => {
  const entries = {
    '2026-04-14': {
      learnedItems: JSON.stringify([
        { id: 'l1', topic: '법리·판례', subtopic: '증거법', title: '전자문서 제출', content: '원본성 주장 정리' },
      ]),
    },
    '2026-04-15': {
      learnedItems: JSON.stringify([
        { id: 'l2', topic: '법리·판례', subtopic: '증거법', title: '문자 캡처 증거', content: '대화 맥락 포함 필요' },
        { id: 'l3', topic: '실무 팁', subtopic: '', title: '기일 전 체크', content: '전날 송달 확인' },
      ]),
    },
  };

  const groups = buildLearnedTopicGroups(entries);

  assert.deepEqual(groups.map((group) => group.topic), ['법리·판례', '실무 팁']);
  assert.equal(groups[0].items[0].date, '2026-04-15');
  assert.equal(groups[0].items[1].date, '2026-04-14');
});

test('searchLearnedItems filters by query across title and content', () => {
  const entries = {
    '2026-04-14': {
      learnedItems: JSON.stringify([
        { id: 'l1', topic: '법리·판례', subtopic: '증거법', title: '전자문서 제출', content: '원본성 주장 정리' },
      ]),
    },
    '2026-04-15': {
      learnedItems: JSON.stringify([
        { id: 'l2', topic: '실무 팁', subtopic: '', title: '기일 전 체크', content: '전날 송달 확인' },
      ]),
    },
  };

  const results = searchLearnedItems(entries, '송달');

  assert.equal(results.length, 1);
  assert.equal(results[0].title, '기일 전 체크');
});

test('buildLearnedArchiveStats returns counts for items and topics', () => {
  const entries = {
    '2026-04-14': {
      learnedItems: JSON.stringify([
        { id: 'l1', topic: '법리·판례', subtopic: '증거법', title: '전자문서 제출', content: '원본성 주장 정리' },
      ]),
    },
    '2026-04-15': {
      learnedItems: JSON.stringify([
        { id: 'l2', topic: '실무 팁', subtopic: '', title: '기일 전 체크', content: '전날 송달 확인' },
        { id: 'l3', topic: '실무 팁', subtopic: '송달', title: '보정명령 대응', content: '기한 관리' },
      ]),
    },
  };

  const stats = buildLearnedArchiveStats(entries, '2026-04');

  assert.equal(stats.totalItems, 3);
  assert.equal(stats.totalTopics, 2);
  assert.equal(stats.monthItems, 3);
});

test('parseChecklistItems and serializeChecklistItems keep checkbox state', () => {
  const items = parseChecklistItems('[ ] 초안 작성\n[x] 판례 확인');

  assert.deepEqual(items, [
    { id: null, text: '초안 작성', done: false },
    { id: null, text: '판례 확인', done: true },
  ]);

  assert.equal(
    serializeChecklistItems(items),
    '[ ] 초안 작성\n[x] 판례 확인'
  );
});
