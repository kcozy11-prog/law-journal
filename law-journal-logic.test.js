import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseChecklistItems,
  serializeChecklistItems,
  carryForwardTomorrowTasks,
  sortDelegatedTasks,
  buildLearnedTopicGroups,
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
