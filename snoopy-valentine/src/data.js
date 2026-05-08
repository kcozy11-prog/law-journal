// Hearts For My Sweet Baboo — Peanuts Valentine episode
// 각 장면의 lines 배열에서, 객체로 표현된 항목은 빈칸이 있는 문장이고,
// blanks 배열에 정답이 순서대로 들어 있어요.
// 문장 안에서 정답이 들어갈 자리는 "{}"로 표시했습니다.

export const scenes = [
  {
    id: 1,
    title: 'Scene 1 — Charlie Brown and Snoopy with Valentines',
    titleKo: '장면 1 — 찰리 브라운과 스누피, 그리고 발렌타인 카드',
    speakers: [
      {
        who: 'Charlie Brown',
        en: { text: 'Snoopy, look at all these {}! There\'s even one for you. How about that?', blanks: ['Valentines'] },
        ko: '스누피, 이 발렌타인 카드들 좀 봐! 네 것도 있어. 어때?'
      },
      {
        who: 'Charlie Brown',
        en: { text: 'Oh, here\'s another one for you. And another! Must be your {} day.', blanks: ['lucky'] },
        ko: '오, 여기 또 하나 더 있네. 또 있어! 오늘은 운수 좋은 날인가 본데.'
      },
      {
        who: 'Charlie Brown',
        en: { text: 'Wait, here\'s one with my {} on it.', blanks: ['name'] },
        ko: '잠깐, 여기 내 이름이 적힌 게 하나 있네.'
      },
      {
        who: 'Charlie Brown (reading)',
        en: { text: '"Charlie Brown, please {} this to Snoopy." I didn\'t even {} one.', blanks: ['give', 'get'] },
        ko: '"찰리 브라운, 이것 좀 스누피에게 전해줘." 난 한 장도 못 받았는데.'
      },
      {
        who: 'Charlie Brown (reading)',
        en: { text: '"To the round-headed {} who brings me {}. Happy Valentine\'s Day."', blanks: ['kid', 'supper'] },
        ko: '"나에게 저녁을 가져다주는 머리가 둥근 꼬마에게. 행복한 발렌타인 데이 보내."'
      },
      {
        who: 'Charlie Brown',
        en: { text: 'I know I should be {}, but I\'ll take it. Thanks, old pal.', blanks: ['embarrassed'] },
        ko: '창피해야 한다는 건 알지만, 그래도 받을게. 고맙다 친구야.'
      },
      {
        who: 'Narrator',
        en: { text: 'Charlie Brown sure is {} about getting mail.', blanks: ['excited'] },
        ko: '찰리 브라운은 우편물 받는 걸 정말 좋아하는구나.'
      }
    ]
  },
  {
    id: 2,
    title: 'Scene 2 — Sally making a card',
    titleKo: '장면 2 — 샐리의 카드 만들기',
    speakers: [
      {
        who: 'Sally',
        en: { text: 'Hello, my sweet {}!', blanks: ['baboo'] },
        ko: '안녕, 나의 귀염둥이!'
      },
      {
        who: 'Sally',
        en: { text: 'Nothing says Valentine\'s Day like a {} card.', blanks: ['homemade'] },
        ko: '직접 만든 카드만큼 발렌타인 데이에 어울리는 건 없지.'
      },
      {
        who: 'Sally',
        en: { text: 'Let\'s see... I need to add some {}, sparkles, and the ultimate {} touch: a macaroni {}. Perfection!', blanks: ['glue', 'finishing', 'self-portrait'] },
        ko: '보자... 풀이랑 반짝이도 좀 넣고, 마지막 결정적인 한 방으로 마카로니 자화상을 붙여야지. 완벽해!'
      },
      {
        who: 'Sally',
        en: { text: 'Snoopy, I need you to take this. It\'s not for you. I need you to {} it.', blanks: ['deliver'] },
        ko: '스누피, 이것 좀 가져가 줘. 네 거 아니야. 배달해 줘야 해.'
      },
      {
        who: 'Sally',
        en: { text: 'After all, there\'s nothing classier than a personal {}.', blanks: ['courier'] },
        ko: '결국 개인 심부름꾼만큼 품격 있는 건 없으니까.'
      },
      {
        who: 'Sally',
        en: { text: 'Take it to my sweet baboo. He\'s the one who puts a {} in my heart. Got it?', blanks: ['song'] },
        ko: '내 귀염둥이에게 가져다줘. 그는 내 마음에 노래를 불러주는 사람이야. 알겠지?'
      }
    ]
  },
  {
    id: 3,
    title: 'Scene 3 — Delivery mistakes',
    titleKo: '장면 3 — 계속되는 배달 실수',
    speakers: [
      {
        who: 'Schroeder',
        en: { text: 'Can I help you? This is for {}?', blanks: ['me'] },
        ko: '도와줄까? 이게 내 거라고?'
      },
      {
        who: 'Sally',
        en: { text: 'That must be my sweet baboo! I\'ll {} he really liked my macaroni portrait.', blanks: ['bet'] },
        ko: '내 귀염둥이임에 틀림없어! 내 마카로니 초상화를 정말 좋아했을 거야.'
      },
      {
        who: 'Sally',
        en: { text: 'Hello? He did what? This is {}!', blanks: ['outrageous'] },
        ko: '여보세요? 그가 뭘 했다고? 이건 말도 안 돼!'
      },
      {
        who: 'Sally',
        en: { text: 'I mean, I\'m glad you {} it, Schroeder.', blanks: ['liked'] },
        ko: '내 말은, 네가 좋아했다니 다행이네, 슈로더.'
      },
      {
        who: 'Sally',
        en: { text: 'Snoopy, you gave my Valentine to the {} person!', blanks: ['wrong'] },
        ko: '스누피, 내 발렌타인 카드를 엉뚱한 사람한테 줬잖아!'
      },
      {
        who: 'Sally',
        en: { text: 'Now I have to make another {} that captures the true {} of my love.', blanks: ['masterpiece', 'depth'] },
        ko: '이제 내 사랑의 깊이를 담은 또 다른 걸작을 만들어야 하잖아.'
      },
      {
        who: 'Sally',
        en: { text: 'You think that\'s {}? It\'s not. Construction paper, glue, {}, extra {}... Perfect!', blanks: ['easy', 'macaroni', 'sparkles'] },
        ko: '이게 쉬운 줄 아니? 아니라고. 도화지, 풀, 마카로니, 반짝이 추가... 완벽해!'
      }
    ]
  },
  {
    id: 4,
    title: 'Scene 4 — Final resolution',
    titleKo: '장면 4 — 마지막 결말',
    speakers: [
      {
        who: 'Charlie Brown',
        en: { text: 'Sally, I\'m the last person to give {} on Valentine\'s Day, but have you considered that it might not be Snoopy\'s {}?', blanks: ['advice', 'fault'] },
        ko: '샐리, 내가 발렌타인 데이에 대해 조언할 처지는 아니지만, 이게 스누피 잘못이 아닐 수도 있다는 생각은 안 해봤니?'
      },
      {
        who: 'Charlie Brown',
        en: { text: 'Maybe he wasn\'t {} who your sweet baboo is.', blanks: ['sure'] },
        ko: '아마 네 귀염둥이가 누구인지 잘 몰랐을 수도 있잖아.'
      },
      {
        who: 'Sally',
        en: { text: 'Well, he could have just {} me! It doesn\'t matter now. Valentine\'s Day is {}.', blanks: ['asked', 'ruined'] },
        ko: '그럼 그냥 나한테 물어봤으면 됐잖아! 이제 상관없어. 발렌타인 데이는 완전히 망쳤어.'
      },
      {
        who: 'Charlie Brown',
        en: { text: 'It\'s not your fault, Snoopy. It\'s just Valentine\'s Day {} a lot to Sally.', blanks: ['means'] },
        ko: '네 잘못이 아니야 스누피. 그냥 샐리한테 발렌타인 데이가 의미가 커서 그래.'
      },
      {
        who: 'Friends',
        en: { text: 'Because you made so many nice Valentine\'s Day cards for everyone, we wanted to do something {} for you. Happy Valentine\'s Day!', blanks: ['special'] },
        ko: '네가 모두를 위해 예쁜 발렌타인 카드를 많이 만들어줘서, 우리도 널 위해 특별한 걸 준비하고 싶었어. 해피 발렌타인 데이!'
      },
      {
        who: 'Sally',
        en: { text: 'For me? Oh, thank you! You even got the macaroni-to-sparkle {} just right.', blanks: ['ratio'] },
        ko: '내 거니? 오, 고마워! 마카로니와 반짝이 비율을 아주 딱 맞게 맞췄구나.'
      },
      {
        who: 'Charlie Brown',
        en: { text: 'Huh, who knew a day in the middle of February could bring so many people {}?', blanks: ['together'] },
        ko: '허, 2월 한복판의 어느 하루가 이렇게 많은 사람을 하나로 모을 줄 누가 알았겠어?'
      }
    ]
  }
]

export const learningTips = [
  {
    term: 'Sweet Baboo',
    tip: '샐리가 라이너스를 부르는 애칭. "귀염둥이" 정도로 해석돼요.'
  },
  {
    term: 'Shadowing',
    tip: '영상에서 같은 문장이 세 번씩 반복되니, 영어 스크립트를 보며 발음과 억양을 그대로 따라 해보세요.'
  },
  {
    term: 'Macaroni self-portrait',
    tip: '마카로니로 만든 자화상. 미국 어린이 미술 활동의 단골 재료예요.'
  }
]
