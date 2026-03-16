// ═══════════════════════════════════════════════════════════
//  KETI 7대 전략기술 역량 대시보드 — dashboard.js
//  통합 데이터 모델 + 양방향 연계 렌더링
// ═══════════════════════════════════════════════════════════

// ─── 연구센터 풀 (고정 목록) ─────────────────────────────
const CENTER_POOL = [
  'AI기반모델','복합지능','정보미디어','자율지능시스템','콘텐츠응용',
  '자율형IoT','지능융합SW','AI융합가전','IT응용','산업데이터융합',
  '스마트전장','SoC플랫폼','지능형반도체디바이스','ICT나노융합',
  '모빌리티플랫폼','스마트센서','융합신호SoC','에너지IT융합',
  '메디컬IT융합','스마트네트워크','XR융합플랫폼','홀로그램',
  '자율제조','지능로보틱스','지능메카트로닉스','IT융합시스템',
  'ICT디바이스·패키징','융복합전자소재','에너지변환','차세대전지',
  '디지털혁신지원','신뢰성'
].sort();

// ─── 통합 데이터 모델 ────────────────────────────────────
// techs 배열: 문자열 → 객체 (트렌드 카드 상세정보 포함)
// caps 배열: { title, image } (이미지+제목, 여러 개 가능)
const DEFAULT_MAP_DATA = {
  core: [
    { id:'c_learn', name:'학습지능', count:53,
      centers:['AI기반모델','정보미디어','모빌리티플랫폼','콘텐츠응용','IT응용','산업데이터융합','스마트전장','자율형IoT','SoC플랫폼','지능형반도체디바이스','ICT나노융합'],
      mgr_a:'신사임', mgr_b:'금승우',
      techs:[
        { id:'ct_ml', title:'머신러닝', asis:'객체 인식, 추적, 생성', tobe:'학습되지 않은 개체 인식',
          caps:[{title:'학습데이터 기반 객체인식',image:'../Image/AI/AI 핵심기술/학습데이터 기반 객체인식.png'},{title:'크로스모달 상호참조',image:'../Image/AI/AI 핵심기술/크로스모달 상호참조.png'},{title:'웹규모 개체인식',image:'../Image/AI/AI 핵심기술/웹규모 개체인식.png'}],
          centers:['AI기반모델','정보미디어','모빌리티플랫폼','콘텐츠응용'], mgr_a:'신사임', mgr_b:'금승우'},
        { id:'ct_gen', title:'생성 AI 모델 연구', asis:'확산모델 기반 데이터 편집·생성', tobe:'소량데이터 기반 모델 일반화',
          caps:[{title:'AI 데이터 전처리 플랫폼',image:'../Image/AI/AI 핵심기술/AI 데이터 전처리 플랫폼.png'},{title:'콘텐츠 개인화',image:'../Image/AI/AI 핵심기술/콘텐츠 개인화.png'},{title:'Diffusion Model 알고리즘 개선',image:'../Image/AI/AI 핵심기술/Diffusion Model 알고리즘 개선.png'}],
          centers:['AI기반모델','IT응용','산업데이터융합'], mgr_a:'신사임', mgr_b:'이영한'},
        { id:'ct_reason', title:'추론·지식표현', asis:'규칙 기반 지식 표현·추론', tobe:'신경-기호 통합 지식 추론',
          caps:[{title:'지식 그래프 구축',image:null},{title:'논리 기반 추론 엔진',image:null},{title:'상식 추론 모델',image:null}],
          centers:['AI기반모델','복합지능','정보미디어'], mgr_a:'신사임', mgr_b:'금승우'},
        { id:'ct_snn', title:'스파이킹 신경망 학습', asis:'GPU 기반 딥러닝 계산', tobe:'SNN 기반 뇌모사 저전력 학습',
          caps:[{title:'STDP 기반 SNN 학습',image:null},{title:'이벤트 기반 신경망',image:null},{title:'SNN 시뮬레이터',image:null}],
          centers:['AI기반모델','지능형반도체디바이스'], mgr_a:'신사임', mgr_b:'금승우'}
      ]},
    { id:'c_single', name:'단일지능', count:45,
      centers:['AI기반모델','복합지능','정보미디어','모빌리티플랫폼','콘텐츠응용','IT응용','산업데이터융합','자율형IoT','지능융합SW','ICT나노융합'],
      mgr_a:'신사임', mgr_b:'이영한',
      techs:[
        { id:'ct_audio', title:'청각지능', asis:'소용량 음성 생성 (15분 분량)', tobe:'Zero-shot 음성 생성 (10초 기반)',
          caps:[{title:'고품질 음성 생성',image:'../Image/AI/AI 핵심기술/고품질 음성 생성.jpg'},{title:'다국어 변환',image:'../Image/AI/AI 핵심기술/다국어 변환.png'},{title:'한국어 가창 합성',image:'../Image/AI/AI 핵심기술/한국어 가창 합성.png'}],
          centers:['AI기반모델','복합지능','콘텐츠응용'], mgr_a:'신사임', mgr_b:'이영한'},
        { id:'ct_visual', title:'시각지능', asis:'도메인 특화 이해/생성', tobe:'자가성장 기반 이해/생성',
          caps:[{title:'실사 디지털 휴먼',image:'../Image/AI/AI 핵심기술/실사 디지털 휴먼.png'},{title:'미디어 자동 제작',image:'../Image/AI/AI 핵심기술/미디어 자동 제작.png'},{title:'다중 객체 탐지·예측',image:'../Image/AI/AI 핵심기술/다중 객체 탐지 및 예측.png'}],
          centers:['AI기반모델','복합지능','정보미디어'], mgr_a:'신사임', mgr_b:'이영한'},
        { id:'ct_lang', title:'언어지능', asis:'한국어 특화 NLP 모델', tobe:'멀티링구얼 거대언어모델 (LLM)',
          caps:[{title:'한국어 LLM',image:null},{title:'자연어처리 플랫폼',image:null},{title:'대화 시스템',image:null}],
          centers:['AI기반모델','복합지능'], mgr_a:'신사임', mgr_b:'이영한'},
        { id:'ct_tactile', title:'촉각물리지능', asis:'기계적 촉각 센서 신호 처리', tobe:'AI 기반 촉각·물리 상호작용 지능',
          caps:[{title:'촉각 센서 인터페이스',image:null},{title:'물리 시뮬레이션',image:null},{title:'역각 제어',image:null}],
          centers:['AI기반모델','복합지능'], mgr_a:'신사임', mgr_b:'이영한'}
      ]},
    { id:'c_complex', name:'복합지능', count:56,
      centers:['AI기반모델','복합지능','정보미디어','자율지능시스템','콘텐츠응용','자율형IoT','지능융합SW','AI융합가전','IT응용'],
      mgr_a:'신사임', mgr_b:'이영한',
      techs:[
        { id:'ct_agent', title:'지능형 에이전트', asis:'정보검색 및 대화 에이전트', tobe:'자율적 지능형 협업 에이전트',
          caps:[{title:'개성(Persona) 에이전트',image:'../Image/AI/AI 핵심기술/개성(Persona) 에이전트.png'},{title:'대화형 에이전트 시스템',image:'../Image/AI/AI 핵심기술/대화형 에이전트 시스템.png'},{title:'Agentic LLM',image:'../Image/AI/AI 핵심기술/Agentic LLM.png'}],
          centers:['복합지능','AI기반모델','자율지능시스템'], mgr_a:'신사임', mgr_b:'이영한'},
        { id:'ct_behavior', title:'행동·사회지능', asis:'단순 행동 패턴 인식', tobe:'사회적 맥락 기반 행동 예측·이해',
          caps:[{title:'행동 패턴 분석',image:null},{title:'사회적 상호작용 모델',image:null},{title:'그룹 행동 예측',image:null}],
          centers:['복합지능','AI기반모델'], mgr_a:'신사임', mgr_b:'이영한'},
        { id:'ct_emotion', title:'상황·감정이해', asis:'단일 모달 감정 인식', tobe:'멀티모달 상황·감정 통합 이해',
          caps:[{title:'멀티모달 감정 분석',image:null},{title:'맥락 인식 모델',image:null},{title:'감정 기반 서비스',image:null}],
          centers:['복합지능','AI기반모델','콘텐츠응용'], mgr_a:'신사임', mgr_b:'이영한'},
        { id:'ct_agi', title:'범용 인공지능', asis:'도메인 특화 단일 목적 AI', tobe:'자율적 범용 목적 AI 에이전트',
          caps:[{title:'Foundation Model 연구',image:null},{title:'AGI 아키텍처',image:null},{title:'자율 학습 시스템',image:null}],
          centers:['AI기반모델','복합지능','자율지능시스템'], mgr_a:'신사임', mgr_b:'이영한'}
      ]},
    { id:'c_edge', name:'엣지 AI', count:35,
      centers:['정보미디어','지능형반도체디바이스','자율형IoT','복합지능','SoC플랫폼','스마트네트워크','콘텐츠응용','XR융합플랫폼','지능융합SW','AI융합가전'],
      mgr_a:'금승우', mgr_b:'장성준',
      techs:[
        { id:'ct_edge1', title:'초경량 엣지AI 모델', asis:'클라우드 기반 대형 AI 모델', tobe:'초경량 온디바이스 AI 추론',
          caps:[{title:'모델 경량화',image:null},{title:'지식 증류',image:null},{title:'양자화 기술',image:null}],
          centers:['정보미디어','지능형반도체디바이스'], mgr_a:'금승우', mgr_b:'장성준'},
        { id:'ct_edge2', title:'엣지AI 학습', asis:'서버 집중형 AI 학습', tobe:'온디바이스 연합·적응형 학습',
          caps:[{title:'연합 학습 프레임워크',image:null},{title:'적응형 파인튜닝',image:null},{title:'프라이버시 보존 학습',image:null}],
          centers:['정보미디어','지능형반도체디바이스'], mgr_a:'금승우', mgr_b:'장성준'},
        { id:'ct_edge3', title:'엣지AI 프레임워크', asis:'특정 하드웨어 종속 AI 런타임', tobe:'이기종 엣지 장치 통합 AI 프레임워크',
          caps:[{title:'크로스플랫폼 AI 런타임',image:null},{title:'엣지-클라우드 연동',image:null},{title:'하드웨어 추상화',image:null}],
          centers:['정보미디어','지능형반도체디바이스'], mgr_a:'금승우', mgr_b:'장성준'},
        { id:'ct_edge4', title:'적응형 엣지 지능 관리', asis:'정적 규칙 기반 엣지 관리', tobe:'상황인식 기반 자율 엣지 지능 관리',
          caps:[{title:'자율 자원 관리',image:null},{title:'동적 AI 모델 배포',image:null},{title:'엣지 오케스트레이션',image:null}],
          centers:['정보미디어','지능형반도체디바이스'], mgr_a:'금승우', mgr_b:'장성준'}
      ]},
    { id:'c_ethics', name:'AI 윤리·안전', count:19,
      centers:['복합지능','AI기반모델','콘텐츠응용'],
      mgr_a:'이영한', mgr_b:'조충상',
      techs:[
        { id:'ct_deepfake', title:'딥페이크 탐지', asis:'정적 구조의 딥페이크 탐지', tobe:'능동적 구조의 딥페이크 탐지',
          caps:[{title:'딥페이크 영상 탐지',image:null},{title:'딥페이크 오디오 탐지',image:null},{title:'딥페이크 탐지 분석/설명',image:null}],
          centers:['복합지능','AI기반모델','콘텐츠응용'], mgr_a:'이영한', mgr_b:'조충상'},
        { id:'ct_align', title:'인공지능 정렬', asis:'규칙 기반 AI 안전 제약', tobe:'인간 가치 정렬 AI 시스템',
          caps:[{title:'RLHF 기반 정렬',image:null},{title:'안전 학습 알고리즘',image:null},{title:'가치 정렬 평가 프레임워크',image:null}],
          centers:['복합지능','AI기반모델'], mgr_a:'이영한', mgr_b:'조충상'},
        { id:'ct_xai', title:'설명가능 인공지능', asis:'블랙박스 AI 결과 제공', tobe:'투명하고 해석 가능한 AI 의사결정',
          caps:[{title:'Explainable AI',image:'../Image/AI/AI 핵심기술/Explainable AI.png'},{title:'의사결정 근거 시각화',image:null},{title:'해석 가능 모델',image:null}],
          centers:['복합지능','AI기반모델','콘텐츠응용'], mgr_a:'이영한', mgr_b:'조충상'},
        { id:'ct_trust', title:'신뢰가능한 AI 보안', asis:'사후 대응형 AI 보안', tobe:'선제적 AI 공격·취약점 방어',
          caps:[{title:'적대적 공격 방어',image:null},{title:'AI 모델 보안 평가',image:null},{title:'프라이버시 보호 AI',image:null}],
          centers:['복합지능','AI기반모델'], mgr_a:'이영한', mgr_b:'조충상'}
      ]}
  ],
  base: [
    { id:'b_semi', name:'AI 반도체', count:48,
      centers:['SoC플랫폼','지능형반도체디바이스','융합신호SoC','ICT나노융합','신뢰성','스마트센서','산업데이터융합'],
      mgr_a:'김병수', mgr_b:'장성준',
      techs:[
        { id:'bt_neuro', title:'뉴로모픽 반도체', asis:'단순 뇌구조 모방, 추론 중심 반도체로 활용성 낮음', tobe:'뇌 기반 온칩 학습 기술로 실생활 활용 확대',
          caps:[{title:'STDP SNN 반도체',image:null},{title:'Hybrid SNN 반도체',image:null},{title:'이벤트 카메라 SNN 응용',image:null}],
          centers:['SoC플랫폼','지능형반도체디바이스','ICT나노융합'], mgr_a:'김병수', mgr_b:'장성준'},
        { id:'bt_ondevice', title:'엣지용 온디바이스 AI 반도체', asis:'서버 중심 고성능 AI 반도체, 학습 불가한 온디바이스 반도체', tobe:'온디바이스 학습·추론 반도체, 저전력 구현',
          caps:[{title:'NPU 코어 설계',image:null},{title:'온디바이스 추론 최적화',image:null},{title:'이기종 집적 Chip',image:null}],
          centers:['SoC플랫폼','지능형반도체디바이스'], mgr_a:'김병수', mgr_b:'장성준'},
        { id:'bt_server', title:'서버향 AI 추론 반도체', asis:'메모리 대역폭으로 인한 속도 저하, 비선형 함수 연산속도 저하', tobe:'다종 메모리 기반 LLM 모델 가속 솔루션',
          caps:[{title:'다종 메모리 연결구조 LLM 가속',image:null},{title:'하드웨어 플랫폼 제어 API',image:null},{title:'최신 함수 가속 HW IP',image:null}],
          centers:['SoC플랫폼','지능형반도체디바이스','ICT나노융합'], mgr_a:'김병수', mgr_b:'장성준'}
      ]},
    { id:'b_sensor', name:'AI 센서', count:52,
      centers:['스마트센서','융합신호SoC','에너지IT융합','메디컬IT융합','ICT나노융합','스마트네트워크'],
      mgr_a:'차철웅', mgr_b:'이성호',
      techs:[
        { id:'bt_sw_sensor', title:'소프트웨어 센서', asis:'물리 센서에 의존한 계측, 설치 비용 부담·고장 시 계측 중단', tobe:'데이터 기반 지능형 계측, 물리 센서 대체·보완',
          caps:[{title:'WiFi CSI 기반 재실 감지 SW 센서',image:null},{title:'전력소비 기반 재실자수 감지',image:null},{title:'스마트폰 기반 수면 감지',image:null}],
          centers:['스마트센서','융합신호SoC','ICT나노융합'], mgr_a:'차철웅', mgr_b:'이성호'},
        { id:'bt_bio_sensor', title:'무자각 바이오헬스 센서', asis:'착용형·분리형 바이오헬스 센서 중심의 계측', tobe:'비접촉·삽입형 바이오헬스 센서, 바이오칩+AI 융합 분석',
          caps:[{title:'웨어러블 바이오헬스 센서',image:null},{title:'바이오칩 회로·분석',image:null},{title:'SW 분리형 센서',image:null}],
          centers:['스마트센서','메디컬IT융합','ICT나노융합'], mgr_a:'차철웅', mgr_b:'이성호'}
      ]},
    { id:'b_cloud', name:'클라우드', count:33,
      centers:['메디컬IT융합','SoC플랫폼','지능형반도체디바이스','정보미디어','에너지IT융합','자율형IoT','지능융합SW'],
      mgr_a:'김영환', mgr_b:'김병수',
      techs:[
        { id:'bt_autoai', title:'자동화 AI 플랫폼 기술', asis:'수집/학습/배포/분석 수동 구성, 재현성·관리성 낮음', tobe:'End-to-End 자동화 파이프라인, 높은 재현성·확장성',
          caps:[{title:'MLOps 시스템 Stack',image:null},{title:'E2E 자동화 파이프라인',image:null},{title:'엣지 기반 복합 성능 분석 플랫폼',image:null}],
          centers:['메디컬IT융합','SoC플랫폼','정보미디어'], mgr_a:'김영환', mgr_b:'김병수'},
        { id:'bt_distrib', title:'이종 AI 반도체 분산추론', asis:'GPU 활용으로 인한 대규모 전력 소모 및 TCO 증가', tobe:'NPU/PIM/DPU 등 이종 AI 반도체 특성에 최적화된 분산추론',
          caps:[{title:'시스템 모델링 프레임워크',image:null},{title:'연산 스케쥴러 개발',image:null},{title:'이종 디바이스 MoE 최적화',image:null}],
          centers:['SoC플랫폼','지능형반도체디바이스','정보미디어'], mgr_a:'김영환', mgr_b:'김병수'}
      ]},
    { id:'b_twin', name:'디지털트윈', count:36,
      centers:['자율지능시스템','에너지IT융합','콘텐츠응용','모빌리티플랫폼','IT응용','XR융합플랫폼'],
      mgr_a:'이상신', mgr_b:'이상엽',
      techs:[
        { id:'bt_dtfr', title:'디지털트윈 생성 프레임워크', asis:'필요 서비스마다 신규 디지털트윈을 구축하는 반복적 개발', tobe:'플랫폼 중심으로 기구축 디지털트윈 활용·관리',
          caps:[{title:'디지털트윈 플랫폼 기술',image:null},{title:'시공간 동기화 기술',image:null},{title:'디지털트윈 지능 공유 기술',image:null}],
          centers:['자율지능시스템','콘텐츠응용','모빌리티플랫폼'], mgr_a:'이상신', mgr_b:'이상엽'},
        { id:'bt_fedtwin', title:'연합 트윈', asis:'단일 디지털트윈의 개별 운용, 이종 DT 간 연계 어려움', tobe:'이종 디지털트윈 간 연계 지원, 다차원 정보 검색',
          caps:[{title:'트윈 메타데이터 관리',image:null},{title:'연합 객체 생성 프레임워크',image:null},{title:'지능형 동기화 엔진',image:null}],
          centers:['자율지능시스템','콘텐츠응용','IT융합시스템'], mgr_a:'이상신', mgr_b:'이상엽'}
      ]},
    { id:'b_data', name:'데이터', count:44,
      centers:['정보미디어','지능융합SW','AI기반모델','자율지능시스템','에너지IT융합','IT응용','콘텐츠응용','자율제조'],
      mgr_a:'금승우', mgr_b:'강정훈',
      techs:[
        { id:'bt_dataproc', title:'현장-AI 데이터처리 자동화', asis:'현장 데이터와 AI 모델학습 단절', tobe:'산업데이터의 AI 데이터화 완전 자동화',
          caps:[{title:'모델 자동 최적화 SW 플랫폼',image:null},{title:'전처리 자동화 SW 플랫폼',image:null},{title:'연산자 기반 SW 연동',image:null}],
          centers:['정보미디어','지능융합SW','AI기반모델','자율형IoT'], mgr_a:'금승우', mgr_b:'강정훈'},
        { id:'bt_bigdata', title:'빅데이터 활용도 개선', asis:'데이터 드리프트 대응 미흡, 빅데이터 카탈로그 관리 어려움', tobe:'Data Drift 판단 기술, 빅데이터 활용도 개선',
          caps:[{title:'빅데이터 스트리밍 분석',image:null},{title:'데이터 카탈로그 관리',image:null},{title:'Data Drift 판단 기술',image:null}],
          centers:['정보미디어','지능융합SW','AI기반모델'], mgr_a:'금승우', mgr_b:'강정훈'},
        { id:'bt_augment', title:'데이터 증강 기술', asis:'데이터 수량 확보를 위한 단순 증강, 증강 데이터 품질 보완 부재', tobe:'Data Lake 구성, 멀티모달 데이터 처리·분석 관리',
          caps:[{title:'도메인 데이터 관리',image:null},{title:'데이터 증식·탐색',image:null},{title:'Legal Data 관계 분석',image:null}],
          centers:['AI기반모델','정보미디어'], mgr_a:'금승우', mgr_b:'강정훈'},
        { id:'bt_motion', title:'휴먼 모션 데이터', asis:'행동 데이터 사전학습 기반 실시간 예측 정확도 제한', tobe:'개인화된 모션 생성, 맞춤형 아바타 실시간 생성 기술',
          caps:[{title:'Motion Transformer',image:null},{title:'MOST',image:null},{title:'Motion Styler',image:null}],
          centers:['AI기반모델','콘텐츠응용'], mgr_a:'금승우', mgr_b:'강정훈'}
      ]}
  ],
  fusion_left: [
    { id:'f_robot', name:'로봇', count:60,
      centers:['지능로보틱스','지능메카트로닉스','지능형반도체디바이스','자율형IoT','자율제조','IT응용'],
      mgr_a:'황정훈', mgr_b:'서정무',
      techs:[
        { id:'ft_robot1', title:'로봇학습·지능증강', asis:'LLM/VLM 기반 단순 작업 추론, 제한된 환경에서 단순 파지·이송', tobe:'LLM/VLM 파운데이션 모델 멀티모달 VLA 기반 지능 증강',
          caps:[{title:'VLM 기반 생활지원 로봇',image:null},{title:'VLM 기반 제조공정 로봇',image:null},{title:'멀티모달 기반 자율조작',image:null}],
          centers:['지능로보틱스','지능메카트로닉스'], mgr_a:'황정훈', mgr_b:'서정무'},
        { id:'ft_robot2', title:'로봇 자율주행·작업', asis:'단위 임무 기반 주행·작업 지능', tobe:'생성형 주행·작업 지능, 목적 달성 자율 임무 생성·수행',
          caps:[{title:'AMM 협력 지능',image:null},{title:'로봇 다중협력 주행',image:null},{title:'고난도 조립 로봇',image:null}],
          centers:['지능로보틱스','지능메카트로닉스'], mgr_a:'황정훈', mgr_b:'서정무'},
        { id:'ft_robot3', title:'로봇 협업·원격제어', asis:'인간 관리하의 협업 작업, 공유제어 기반 조건부 협업', tobe:'로봇 AI 에이전트 주도하의 자율 협업',
          caps:[{title:'비가시권 공유제어',image:null},{title:'휴머노이드 원격제어',image:null},{title:'로봇 협업작업 지능',image:null}],
          centers:['지능로보틱스','지능메카트로닉스'], mgr_a:'황정훈', mgr_b:'서정무'},
        { id:'ft_robot4', title:'Physical AI·Embodied AI', asis:'시각기반 월드모델 및 행동 생성 지능, Nvidia 코스모스 수준', tobe:'인간이상의 초감각 기반 피지컬 AI',
          caps:[{title:'휴머노이드 시스템',image:null},{title:'온디바이스향 로봇 AI',image:null},{title:'로봇 Sim2Real',image:null}],
          centers:['지능로보틱스','지능메카트로닉스'], mgr_a:'황정훈', mgr_b:'서정무'}
      ]},
    { id:'f_mobility', name:'모빌리티', count:64,
      centers:['모빌리티플랫폼','스마트전장','지능형반도체디바이스','자율형IoT','IT융합시스템','IT응용'],
      mgr_a:'박부식', mgr_b:'조현창',
      techs:[
        { id:'ft_mob1', title:'객체인지·경로 판단·예측', asis:'카메라+라이다 2D/3D 객체인식, Rule 기반 경로 판단', tobe:'Fusion BEV & Prediction, Mapless E2E 자율주행',
          caps:[{title:'BEV 3D Detection',image:null},{title:'Map Generation',image:null},{title:'Motion Prediction',image:null}],
          centers:['모빌리티플랫폼','스마트전장'], mgr_a:'박부식', mgr_b:'조현창'},
        { id:'ft_mob2', title:'자율주행 학습·시뮬레이션', asis:'수동 시나리오 기반 자율차 단일 검증, 모듈러 알고리즘 개별 기능 검증', tobe:'다중 실차 연계 Lv4 가상 검증, E2E SIM2Real Feed-back',
          caps:[{title:'Sensor Emulation',image:null},{title:'Photo-Realistic 가상환경',image:null},{title:'E2E SIM2Real 검증',image:null}],
          centers:['모빌리티플랫폼','스마트전장'], mgr_a:'박부식', mgr_b:'조현창'}
      ]},
    { id:'f_manuf', name:'자율제조', count:41,
      centers:['자율제조','지능융합SW','지능로보틱스','IT응용','에너지IT융합','산업데이터융합'],
      mgr_a:'송병훈', mgr_b:'강정훈',
      techs:[
        { id:'ft_manuf1', title:'공정·장비 특화 솔루션', asis:'딥러닝 공정·장비 데이터 학습, 정형 시계열 데이터 기반 최적화', tobe:'공정 자율학습 초거대 AI, 자가 학습 공정·장비 성능 판단',
          caps:[{title:'장비 동작 판단 AI',image:null},{title:'공정판단 AI',image:null},{title:'공정 빅데이터 분석',image:null}],
          centers:['자율제조','지능융합SW'], mgr_a:'송병훈', mgr_b:'강정훈'},
        { id:'ft_manuf2', title:'제품 R&D 시뮬레이션', asis:'공정 물리 시뮬레이션, 디지털 트윈 기반 공정문제 해결', tobe:'자율 실험 에이전트 AI, 자율 실험 계획 수립 이론지능',
          caps:[{title:'물리 시뮬레이션 공정 가상화',image:null},{title:'시뮬레이션 AI',image:null},{title:'공정 설계 자동화',image:null}],
          centers:['자율제조','지능융합SW','지능로보틱스'], mgr_a:'송병훈', mgr_b:'강정훈'}
      ]},
    { id:'f_telecom', name:'통신·전파', count:25,
      centers:['ICT디바이스·패키징','융복합전자소재','ICT나노융합','스마트네트워크','융합신호SoC'],
      mgr_a:'김동수', mgr_b:'유명재',
      techs:[
        { id:'ft_tel1', title:'AI 기반 빔포밍 모듈 고장진단', asis:'인력 투입 수리, 고비용 유지보수 비용 발생', tobe:'AI 기술을 활용한 빔포밍 결함 실시간 감지·빔 재구성',
          caps:[{title:'타일형 빔포밍 모듈',image:null},{title:'실시간 빔패턴 모니터링 보드',image:null},{title:'실시간 고장진단 알고리즘',image:null}],
          centers:['ICT디바이스·패키징','융복합전자소재'], mgr_a:'김동수', mgr_b:'유명재'},
        { id:'ft_tel2', title:'AI 기반 RF 부품 설계 자동화', asis:'전문가 경험 의존 반복적 튜닝 설계, 개발 기간 및 비용 증가', tobe:'데이터 기반 생성 모델·딥러닝 알고리즘 활용 설계 자동화',
          caps:[{title:'능·수동 회로 설계 기술',image:null},{title:'학습기반 성능 최적화',image:null},{title:'AI 기반 설계 자동화',image:null}],
          centers:['ICT디바이스·패키징','융복합전자소재'], mgr_a:'김동수', mgr_b:'유명재'},
        { id:'ft_tel3', title:'AI 기반 통신시스템 (6G)', asis:'무선 자원 비효율화·수동화, 이기종 무선망 무선접속 비효율', tobe:'실시간 사용자 요구 예측 최적 서비스, 무선통신·센싱 동시화',
          caps:[{title:'이기종 무선망 성능 최적화',image:null},{title:'무선 자원 효율적 자율 최적화',image:null},{title:'상황인지 기술',image:null}],
          centers:['ICT디바이스·패키징','스마트네트워크','융합신호SoC'], mgr_a:'김동수', mgr_b:'유명재'}
      ]}
  ],
  fusion_right: [
    { id:'f_energy', name:'에너지', count:26,
      centers:['에너지IT융합','에너지변환','스마트전장','IT응용','지능메카트로닉스','차세대전지'],
      mgr_a:'이상엽', mgr_b:'지영민',
      techs:[
        { id:'ft_en1', title:'AI BEMS', asis:'사일로 건물 시스템 (BAS, EMS, HVAC 등) 개별 독립 운영', tobe:'표준 AI 자율운전 건물 시스템, 공간별 상황인지 기반 자율운전',
          caps:[{title:'AI 자율운전 환경·에너지 지능형 서비스',image:null},{title:'국제 표준 기반 상호운영성',image:null},{title:'딥러닝 시각지능·빅데이터 플랫폼',image:null}],
          centers:['에너지IT융합','에너지변환'], mgr_a:'이상엽', mgr_b:'지영민'},
        { id:'ft_en2', title:'AI 기반 차세대전지 소재 개발', asis:'실험 기반 분자구조단위 단일구조 물질 최적화', tobe:'멀티스케일 기반 가상소재설계, 소재예측 및 후보물질 발굴',
          caps:[{title:'실시간 발전량 예측 AI 모델',image:null},{title:'AI 전력변환 테스트벤치',image:null},{title:'물질 최적화 AI',image:null}],
          centers:['에너지IT융합','에너지변환','차세대전지'], mgr_a:'이상엽', mgr_b:'지영민'}
      ]},
    { id:'f_content', name:'콘텐츠', count:36,
      centers:['콘텐츠응용','XR융합플랫폼','정보미디어','홀로그램'],
      mgr_a:'김현식', mgr_b:'최광순',
      techs:[
        { id:'ft_con1', title:'AI 미디어 생성·제작', asis:'인력 중심 미디어 제작, AI 기반 VFX·디지털 휴먼 화면 편집', tobe:'AI 스토리텔링 기반 가상 프로덕션, 콘텐츠 서사구조 생성',
          caps:[{title:'미디어 지능화 자동 편집',image:null},{title:'영상 객체 미디어 처리',image:null},{title:'실시간 렌더링 기술',image:null}],
          centers:['콘텐츠응용','XR융합플랫폼'], mgr_a:'김현식', mgr_b:'최광순'},
        { id:'ft_con2', title:'AI 콘텐츠 분석·저작권 보호', asis:'장르별 유사도 기반 분류·식별, 비가시적 워터마킹', tobe:'AI 기반 침해 콘텐츠 자동 탐지, AI 워터마킹 자동 테이크다운',
          caps:[{title:'AI 기반 영상물 분류·식별·표절탐지',image:null},{title:'저작권 모니터링·예측 분석',image:null},{title:'자동 테이크다운',image:null}],
          centers:['콘텐츠응용','XR융합플랫폼'], mgr_a:'김현식', mgr_b:'최광순'}
      ]},
    { id:'f_agri', name:'농업·해양', count:25,
      centers:['IT응용','스마트네트워크','정보미디어','디지털혁신지원','지능융합SW','스마트센서'],
      mgr_a:'정성환', mgr_b:'권기원',
      techs:[
        { id:'ft_agri1', title:'AI 육종·자율재배', asis:'수작업 육종 및 스마트팜 재배, 경험·반복 기반 품종관리', tobe:'AI 육종으로 신품종 개발기간 단축, 디지털트윈 기반 多변수 자율재배',
          caps:[{title:'수직농장 자율재배 기술',image:null},{title:'AI 육종 영상분석 기술',image:null},{title:'AI 생육 분석기술',image:null}],
          centers:['IT응용','스마트네트워크'], mgr_a:'정성환', mgr_b:'권기원'},
        { id:'ft_agri2', title:'자율 농작업 기계', asis:'작업자 탑승·원격 제어 농기계, 수동 셋업 기반 제한적 자율주행', tobe:'자율 협업 무인 농작업 기계, 농작업 무인화(≥90%)',
          caps:[{title:'농기계 자율주행 요소기술',image:null},{title:'농산물 수확 로봇',image:null},{title:'육묘 자동화 시스템',image:null}],
          centers:['IT응용','스마트네트워크'], mgr_a:'정성환', mgr_b:'권기원'},
        { id:'ft_agri3', title:'AI 수산·양식', asis:'노동집약적·경험적 노하우에 의한 양식장 운영', tobe:'연중 대량생산 가능한 AI 기반 스마트 육상양식',
          caps:[{title:'디지털 양식 생육 모델',image:null},{title:'아쿠아트윈',image:null},{title:'양식생산·에너지·경영 예측모델',image:null}],
          centers:['IT응용','스마트네트워크'], mgr_a:'정성환', mgr_b:'권기원'}
      ]},
    { id:'f_public', name:'공공', count:65,
      centers:['정보미디어','자율지능시스템','복합지능','자율형IoT','IT응용','콘텐츠응용','홀로그램'],
      mgr_a:'금승우', mgr_b:'이상신',
      techs:[
        { id:'ft_pub1', title:'멀티모달 물리보안', asis:'딥러닝 기반 단일 지능 보안영상 분석', tobe:'멀티모달 생성형 AI 기반 영상보안 관제, 온디바이스 엣지 보안',
          caps:[{title:'멀티모달 보안 상황인지',image:null},{title:'온디바이스 엣지 보안 지능 기술',image:null},{title:'AI 기반 범죄구성요소 분석',image:null}],
          centers:['정보미디어','자율지능시스템'], mgr_a:'금승우', mgr_b:'이상신'},
        { id:'ft_pub2', title:'멀티모달 교통 데이터 분석', asis:'단일 엣지 기반 분석 인프라, 단일 지능 상황 인지', tobe:'3-Tier 기반 멀티 엣지 기술 결합, 복합 지능 운용',
          caps:[{title:'멀티모달 교통 데이터 구축',image:null},{title:'합성 데이터 기반 환경 분석',image:null},{title:'분산 엣지 복합 지능',image:null}],
          centers:['정보미디어','자율지능시스템','IT응용'], mgr_a:'금승우', mgr_b:'이상신'}
      ]},
    { id:'f_home', name:'가전', count:22,
      centers:['AI융합가전','콘텐츠응용','복합지능','SoC플랫폼','지능형반도체디바이스'],
      mgr_a:'최철준', mgr_b:'김현식',
      techs:[
        { id:'ft_home1', title:'AI@home 연동·확장', asis:'스마트홈 기반 자동루틴 실행, 글로벌 매터·삼성·LG 플랫폼 종속', tobe:'AI@home 플랫폼서비스 확장, 재실자-Home 연동 기술',
          caps:[{title:'재실자 맞춤 스마트홈 모델',image:null},{title:'사용자·가전 연동 기술',image:null},{title:'AI@Home 작동 시나리오',image:null}],
          centers:['AI융합가전','콘텐츠응용'], mgr_a:'최철준', mgr_b:'김현식'},
        { id:'ft_home2', title:'지능형 상호작용·경험향상', asis:'사용자 정보 중심의 맞춤형 인터페이스, 플랫폼 종속형', tobe:'언어·표정·제스처 복합 요소 기반 개인 맞춤형 사용자 분석',
          caps:[{title:'VLM 기반 감정분석 모델',image:null},{title:'상황 인지형 인터페이스',image:null},{title:'초개인화 맞춤형 서비스',image:null}],
          centers:['AI융합가전','콘텐츠응용'], mgr_a:'최철준', mgr_b:'김현식'}
      ]},
    { id:'f_uav', name:'무인이동체', count:28,
      centers:['자율형IoT','IT응용','모빌리티플랫폼','지능형반도체디바이스'],
      mgr_a:'안일엽', mgr_b:'정성환',
      techs:[
        { id:'ft_uav1', title:'자율비행·군집', asis:'GPS 정밀 위치기반 경로계획·비행, 중앙통제형 군집 비행', tobe:'AI 기반 상황적응 자율비행, 초정밀 군집비행 제어',
          caps:[{title:'임무 군집경로비행',image:null},{title:'다수드론 편대비행',image:null},{title:'다중로봇 협력주행',image:null}],
          centers:['자율형IoT','IT응용','모빌리티플랫폼'], mgr_a:'안일엽', mgr_b:'정성환'},
        { id:'ft_uav2', title:'통합관제·운용', asis:'GCS 개입을 통한 임무서비스 운용, 다수 이기종 통합 관제', tobe:'GCS 개입없는 임무서비스 협력 운용, AI 자율 의사결정',
          caps:[{title:'통합관제시스템',image:null},{title:'통합관제 SW',image:null},{title:'임무서비스 운용',image:null}],
          centers:['자율형IoT','IT응용'], mgr_a:'안일엽', mgr_b:'정성환'},
        { id:'ft_uav3', title:'집단지능 협업', asis:'사전할당 임무계획 분할·협력구성, 통신인프라 지원 협업', tobe:'분산의사결정 기반 자율협업, 무인이동체 간 자율협력',
          caps:[{title:'이기종 무인이동체 간 데이터 공유',image:null},{title:'자율협력 통신구성',image:null},{title:'Edge AI 기반 자율 데이터 분석',image:null}],
          centers:['자율형IoT','IT응용'], mgr_a:'안일엽', mgr_b:'정성환'}
      ]},
    { id:'f_bio', name:'바이오·헬스', count:30,
      centers:['메디컬IT융합','지능융합SW','스마트센서','ICT나노융합'],
      mgr_a:'조영창', mgr_b:'강정훈',
      techs:[
        { id:'ft_bio1', title:'온디바이스 AI 질병 분석·진단', asis:'서버기반 질병 분석·진단, 개인 의료데이터 보안 문제', tobe:'온디바이스 AI 탑재형 질병 진단 의료기기',
          caps:[{title:'서버기반 건강 분석 플랫폼',image:null},{title:'온디바이스 AI 모듈',image:null},{title:'온디바이스 AI 기반 진단',image:null}],
          centers:['메디컬IT융합','지능융합SW'], mgr_a:'조영창', mgr_b:'강정훈'},
        { id:'ft_bio2', title:'AI 기반 디지털 치료', asis:'범용 신경자극 치료기기 및 전자약, 범용 치료기기', tobe:'개인 맞춤형 AI 전자약, 디지털 표현형 기반 맞춤형 DTx',
          caps:[{title:'신경자극기반 디지털 치료',image:null},{title:'AI 전자약·디지털 치료제',image:null},{title:'AI 기반 맞춤형 디지털 치료',image:null}],
          centers:['메디컬IT융합','지능융합SW'], mgr_a:'조영창', mgr_b:'강정훈'}
      ]},
    { id:'f_city', name:'스마트시티', count:19,
      centers:['자율형IoT','IT융합시스템','IT응용'],
      mgr_a:'안일엽', mgr_b:'이승주',
      techs:[
        { id:'ft_city1', title:'AIoT 플랫폼', asis:'자원 및 장치중심 자원 관리, 10만 개 장치 동시관리', tobe:'서비스 맞춤 능동적 자율관리, 다중 도메인 자율적 운용',
          caps:[{title:'AIoT 통합관리 플랫폼',image:null},{title:'도시규모 데이터 통합관리',image:null},{title:'실시간 자율 자원 최적화',image:null}],
          centers:['자율형IoT','IT융합시스템'], mgr_a:'안일엽', mgr_b:'이승주'},
        { id:'ft_city2', title:'스마트시티 데이터허브', asis:'데이터관리 및 통계분석 지원, 일 수십억 건 배치 처리', tobe:'AI 기반 도시 데이터의 융복합 자동화, 비전문가 AI 분석',
          caps:[{title:'데이터허브 기술',image:null},{title:'레퍼런스 역학조사 시스템',image:null},{title:'LLM 기반 AI 데이터 분석',image:null}],
          centers:['자율형IoT','IT융합시스템'], mgr_a:'안일엽', mgr_b:'이승주'},
        { id:'ft_city3', title:'스마트시티 엣지 데이터허브', asis:'도시 로컬 환경의 장치 데이터 수집·관리 및 클라우드 연계', tobe:'Edge+Cloud 연계 자율 데이터 처리·로컬 AI 추론',
          caps:[{title:'스마트시티 엣지 데이터허브',image:null},{title:'엣지-클라우드 연동 플랫폼',image:null},{title:'로컬 AI 추론',image:null}],
          centers:['자율형IoT','IT융합시스템'], mgr_a:'안일엽', mgr_b:'이승주'}
      ]}
  ]
};

// ─── 상태 ────────────────────────────────────────────────
let MAP_DATA = JSON.parse(JSON.stringify(DEFAULT_MAP_DATA));
let isAdmin = false;
let currentUser = null;   // { id, name, role } — null이면 비로그인(방문자)
let authToken = null;     // JWT 토큰
let pendingCardIds = [];  // 승인 대기 중인 카드 ID 목록 [{target_type, target_id}]
let editingId = null;
let editingSection = null;

// ─── API 기반 데이터 로드/저장 ────────────────────────────
// 서버 실행 여부 감지: window._USE_API = true 이면 API 사용, 아니면 localStorage fallback
const USE_API  = (typeof window._USE_API  !== 'undefined') ? window._USE_API  : false;
// 배포된 백엔드 URL. 로컬: '' (상대경로), Railway 배포 시: 'https://xxx.railway.app'
const API_BASE = (typeof window._API_BASE !== 'undefined') ? window._API_BASE : '';

// GitHub raw 콘텐츠 베이스 URL (Image/ 폴더 이미지 서빙용)
const GITHUB_RAW = 'https://raw.githubusercontent.com/hyunhee-oh/-KETI-7-/main';

// 이미지 경로를 절대 URL로 변환
// - Cloudinary URL (https://res.cloudinary.com/...) → 그대로
// - /Image/... 또는 Image/... → GitHub raw 콘텐츠 URL
// - data: → 그대로 (로컬 미리보기)
function resolveImgUrl(path) {
  if (!path) return null;
  if (path.startsWith('data:')) return path;
  if (path.startsWith('http')) return path;  // Cloudinary 등 절대 URL
  // /Image/... → GitHub raw URL
  if (path.startsWith('/Image/')) return GITHUB_RAW + path;
  if (path.startsWith('Image/'))  return GITHUB_RAW + '/' + path;
  if (path.startsWith('../Image/')) return GITHUB_RAW + '/' + path.slice(3);
  // 그 외 /로 시작하는 경로는 API_BASE 사용
  if (path.startsWith('/') && API_BASE) return API_BASE + path;
  return path;
}

// ─── 인증 헤더 생성 헬퍼 ────────────────────────────────
function authHeaders(extra) {
  const h = { ...(extra || {}) };
  if (authToken) h['Authorization'] = 'Bearer ' + authToken;
  return h;
}
function authJsonHeaders() {
  return authHeaders({ 'Content-Type': 'application/json' });
}

// ─── 로그인/로그아웃 ────────────────────────────────────
async function openLoginModal() {
  const modal = document.getElementById('loginModal');
  const sel   = document.getElementById('loginNameSelect');
  document.getElementById('loginError').style.display = 'none';
  document.getElementById('loginPassword').value = '';

  // 사용자 목록 로드
  try {
    const res  = await fetch(API_BASE + '/api/auth/managers');
    const list = await res.json();
    sel.innerHTML = '<option value="">-- 이름을 선택하세요 --</option>';
    list.forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.name;
      opt.textContent = u.name + (u.role === 'admin' ? ' (Admin)' : '');
      sel.appendChild(opt);
    });
  } catch {
    sel.innerHTML = '<option value="">목록 로드 실패</option>';
  }
  modal.classList.add('show');
}
function closeLoginModal() {
  document.getElementById('loginModal').classList.remove('show');
}

async function doLogin() {
  const name     = document.getElementById('loginNameSelect').value;
  const password = document.getElementById('loginPassword').value;
  const errEl    = document.getElementById('loginError');

  if (!name || !password) {
    errEl.textContent = '이름과 비밀번호를 모두 입력해주세요.';
    errEl.style.display = 'block';
    return;
  }
  try {
    const res = await fetch(API_BASE + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password })
    });
    const data = await res.json();
    if (!res.ok) {
      errEl.textContent = data.error || '로그인 실패';
      errEl.style.display = 'block';
      return;
    }
    authToken   = data.token;
    currentUser = data.user;
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    closeLoginModal();
    applyLoginState();
  } catch (e) {
    errEl.textContent = '서버 연결 실패: ' + e.message;
    errEl.style.display = 'block';
  }
}

function logout() {
  authToken   = null;
  currentUser = null;
  isAdmin     = false;
  pendingCardIds = [];
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  applyLoginState();
}

function applyLoginState() {
  const avatar  = document.getElementById('userAvatar');
  const display = document.getElementById('userDisplayName');
  const btn     = document.getElementById('adminBtn');
  const text    = document.getElementById('adminBtnText');
  const banner  = document.getElementById('adminBanner');

  if (currentUser) {
    avatar.textContent  = currentUser.name.charAt(0);
    display.textContent = currentUser.name;
    isAdmin = true;
    btn.classList.add('is-admin');
    text.textContent = '로그아웃';
    banner.classList.add('show');
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = '');
    document.body.classList.add('admin-mode');
    // Admin만 권한 설정 메뉴 표시
    const permMenu = document.getElementById('permMenuItem');
    if (permMenu) permMenu.style.display = (currentUser.role === 'admin') ? '' : 'none';
    loadPendingCards();
  } else {
    avatar.textContent  = '?';
    display.textContent = '방문자';
    isAdmin = false;
    btn.classList.remove('is-admin');
    text.textContent = '관리자 모드';
    banner.classList.remove('show');
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
    document.body.classList.remove('admin-mode');
  }
  renderMap();
  renderAllTrendTabs();
}

async function loadPendingCards() {
  if (!USE_API) return;
  try {
    const res  = await fetch(API_BASE + '/api/approvals/pending-cards');
    pendingCardIds = await res.json();
  } catch { pendingCardIds = []; }
}

function isCardPending(type, id) {
  return pendingCardIds.some(p => p.target_type === type && p.target_id === id);
}

// 카드 편집 가능 여부 판정
function canEditCard(itemOrTech, parentItem) {
  if (!currentUser) return false;
  if (currentUser.role === 'admin') return true;
  // Manager: 담당자 기준
  const n = currentUser.name;
  if (itemOrTech.mgr_a === n || itemOrTech.mgr_b === n) return true;
  if (parentItem && (parentItem.mgr_a === n || parentItem.mgr_b === n)) return true;
  return false;
}

async function loadFromStorage() {
  if (USE_API) {
    try {
      const res = await fetch(API_BASE + '/api/map');
      if (!res.ok) throw new Error('서버 응답 오류: ' + res.status);
      MAP_DATA = await res.json();
    } catch(e) {
      console.warn('API 로드 실패, localStorage fallback:', e.message);
      _loadFromLocalStorage();
    }
  } else {
    _loadFromLocalStorage();
  }
}

function _loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem('keti_map_data_v3');
    if (saved) MAP_DATA = JSON.parse(saved);
  } catch(e) { console.warn('localStorage load failed', e); }
}

function saveToStorage() {
  if (!USE_API) {
    try { localStorage.setItem('keti_map_data_v3', JSON.stringify(MAP_DATA)); }
    catch(e) { console.warn('localStorage save failed', e); }
  }
  // API 모드에서는 각 CRUD 함수가 직접 API 호출
}

// ─── API 호출 헬퍼 ────────────────────────────────────────
async function apiSaveMapItem(item, section, isNew) {
  if (!USE_API) return;
  try {
    const body = { ...item, section };
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? API_BASE + '/api/map/items' : API_BASE + `/api/map/items/${item.id}`;
    const res = await fetch(url, { method, headers: authJsonHeaders(), body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (data.pending) {
      alert('변경 요청이 제출되었습니다. Admin 승인 후 반영됩니다.');
      loadPendingCards();
    }
  } catch(e) { console.warn('apiSaveMapItem 실패:', e); }
}

async function apiDeleteMapItem(id) {
  if (!USE_API) return;
  try {
    const res = await fetch(API_BASE + `/api/map/items/${id}`, { method: 'DELETE', headers: authHeaders() });
    const data = await res.json().catch(() => ({}));
    if (data.pending) { alert('삭제 요청이 제출되었습니다. Admin 승인 후 반영됩니다.'); loadPendingCards(); }
  } catch(e) { console.warn('apiDeleteMapItem 실패:', e); }
}

async function apiSaveTech(tech, itemId, isNew) {
  if (!USE_API) return true;
  try {
    const body = { ...tech, item_id: itemId };
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? API_BASE + '/api/techs' : API_BASE + `/api/techs/${tech.id}`;
    const res = await fetch(url, { method, headers: authJsonHeaders(), body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok && !data.pending) {
      console.error('apiSaveTech 서버 오류:', res.status, data);
      return false;
    }
    if (data.pending) {
      alert('변경 요청이 제출되었습니다. Admin 승인 후 반영됩니다.');
      loadPendingCards();
      return 'pending';
    }
    return true;
  } catch(e) {
    console.error('apiSaveTech 네트워크 오류:', e);
    return false;
  }
}

async function apiDeleteTech(id) {
  if (!USE_API) return;
  try {
    const res = await fetch(API_BASE + `/api/techs/${id}`, { method: 'DELETE', headers: authHeaders() });
    const data = await res.json().catch(() => ({}));
    if (data.pending) { alert('삭제 요청이 제출되었습니다. Admin 승인 후 반영됩니다.'); loadPendingCards(); }
  } catch(e) { console.warn('apiDeleteTech 실패:', e); }
}

/**
 * 이미지 업로드: base64 DataURL → 서버 파일 저장
 * section: 'core' | 'base' | 'fusion_left' | 'fusion_right'
 * 반환값: 서버에 저장된 image 경로 (../Image/AI/.../파일명.png)
 */
async function apiUploadCapImage(dataUrl, title, techId, section) {
  if (!USE_API || !dataUrl || !dataUrl.startsWith('data:')) return dataUrl;
  try {
    // base64를 Blob으로 변환
    const arr  = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
    const blob = new Blob([u8arr], { type: mime });
    const ext  = mime.split('/')[1] || 'png';

    const fd = new FormData();
    fd.append('file', blob, title + '.' + ext);
    fd.append('tech_id', techId);
    fd.append('title', title);
    fd.append('category', section);

    const res  = await fetch(API_BASE + '/api/caps/upload', { method: 'POST', body: fd });
    const data = await res.json();
    // 서버가 반환한 url로 교체
    return data.image_url || dataUrl;
  } catch(e) {
    console.warn('이미지 업로드 실패:', e);
    return dataUrl;
  }
}

// ─── 유틸리티 ────────────────────────────────────────────
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function uid() { return 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2,7); }

function allSections() { return ['core','base','fusion_left','fusion_right']; }
function sectionType(sec) {
  if (sec === 'core') return 'core';
  if (sec === 'base') return 'base';
  return 'fusion';
}
function findItem(id) {
  for (const sec of allSections()) {
    const item = MAP_DATA[sec].find(i => i.id === id);
    if (item) return { item, section: sec };
  }
  return null;
}
function findTech(techId) {
  for (const sec of allSections()) {
    for (const item of MAP_DATA[sec]) {
      const tech = item.techs.find(t => t.id === techId);
      if (tech) return { tech, item, section: sec };
    }
  }
  return null;
}
function getTechTitles(item) {
  return item.techs.map(t => t.title);
}

// ─── 역량맵 렌더링 (탭1) ────────────────────────────────
function buildMapCard(item, type) {
  const showEdit = isAdmin && canEditCard(item, null);
  const pending  = isCardPending('map_item', item.id);
  const editBtn = showEdit
    ? `<button class="mc-edit-btn" onclick="openEditModal('${item.id}')">편집</button>` : '';
  const techsHtml = item.techs.map(t => `<span class="mc-tag">${esc(t.title)}</span>`).join('');
  const centersHtml = item.centers.map(c => `<span class="mc-center-chip">${esc(c)}</span>`).join('');
  const pendingBadge = pending ? '<span class="pending-badge">승인 대기 중</span>' : '';
  return `<div class="mc mc-${type}${pending ? ' mc-pending' : ''}" data-id="${item.id}">
  <div class="mc-body">
    <div class="mc-head">
      <div class="mc-head-row">${pendingBadge}
        <span class="mc-name">${esc(item.name)}</span>
        <span class="mc-cnt">${item.count}명</span>
      </div>
      <div class="mc-mgr-row">
        <span class="mc-mgr-chip lead"><span class="mc-role-badge chief">정</span>${esc(item.mgr_a)}</span>
        <span class="mc-mgr-chip"><span class="mc-role-badge deputy">부</span>${esc(item.mgr_b)}</span>
      </div>
    </div>
    <div class="mc-section">
      <span class="mc-lbl">유망기술</span>
      <div class="mc-tags">${techsHtml}</div>
    </div>
    <div class="mc-section" style="margin-bottom:0">
      <span class="mc-lbl">연구센터</span>
      <div class="mc-centers">${centersHtml}</div>
    </div>
  </div>
  ${editBtn}
</div>`;
}

function renderMap() {
  const container = document.getElementById('techMap');
  if (!container) return;
  const coreCards = MAP_DATA.core.map(i => buildMapCard(i,'core')).join('');
  const baseCards = MAP_DATA.base.map(i => buildMapCard(i,'base')).join('');
  const fusionCards = [...MAP_DATA.fusion_left,...MAP_DATA.fusion_right].map(i => buildMapCard(i,'fusion')).join('');
  const addCore = isAdmin ? `<button class="map-add-btn" onclick="openAddModal('core')">+ 핵심기술 추가</button>` : '';
  const addBase = isAdmin ? `<button class="map-add-btn" onclick="openAddModal('base')">+ 기반기술 추가</button>` : '';
  const addFusion = isAdmin ? `<button class="map-add-btn" style="grid-column:1/-1" onclick="openAddModal('fusion_right')">+ 융합기술 추가</button>` : '';
  container.innerHTML = `
<div class="map-panel mp-core">
  <span class="map-panel-label core">AI 핵심기술</span>
  <div class="map-single-grid">${coreCards}${addCore}</div>
</div>
<div class="map-panel mp-base">
  <span class="map-panel-label base">AI 기반기술<span class="mpl-sub">총괄: 황태호(반도체) · 고재진(시스템)</span></span>
  <div class="map-single-grid">${baseCards}${addBase}</div>
</div>
<div class="map-panel mp-fusion">
  <span class="map-panel-label fusion">AI 융합기술 (AI 응용)</span>
  <div class="map-fusion-grid">${fusionCards}${addFusion}</div>
</div>`;
}

// ─── 트렌드 카드 렌더링 (탭2~4) ─────────────────────────
function buildTrendCard(tech, parentItem, type) {
  const showEdit = isAdmin && canEditCard(tech, parentItem);
  const pending  = isCardPending('tech', tech.id);
  const cls = 'tc-' + type;
  const hasImages = tech.caps.some(c => c.image);
  let capsHtml;
  if (hasImages) {
    const items = tech.caps.map(c => {
      if (c.image) {
        return `<div class="tc-img-item"><img src="${esc(resolveImgUrl(c.image))}" alt="${esc(c.title)}"><span class="tc-img-label">${esc(c.title)}</span></div>`;
      }
      return `<div class="tc-img-item" style="background:#F8F9FB;display:flex;align-items:center;justify-content:center;aspect-ratio:4/3"><span style="color:var(--text-4);font-size:14px">${esc(c.title)}</span></div>`;
    }).join('');
    capsHtml = `<div class="tc-img-grid">${items}</div>`;
  } else {
    capsHtml = `<div class="tc-cap-chips">${tech.caps.map(c => `<span class="tc-cap-chip">${esc(c.title)}</span>`).join('')}</div>`;
  }
  const centersHtml = tech.centers.map(c => `<span class="center-c">${esc(c)}</span>`).join('');
  const mgrA = tech.mgr_a || parentItem.mgr_a;
  const mgrB = tech.mgr_b || parentItem.mgr_b;
  const pendingBadge = pending ? '<span class="pending-badge">승인 대기 중</span>' : '';
  return `<div class="trend-card ${cls}${pending ? ' tc-pending' : ''}" data-cat="${esc(parentItem.name)}" data-tech-id="${tech.id}">
  <div class="trend-card-head">
    <div class="trend-head-left">
      <div class="trend-card-title">${esc(tech.title)}</div>
      <div class="person-row">
        <span class="person-chip"><span class="role-dot chief">정</span>${esc(mgrA)}</span>
        <span class="person-chip"><span class="role-dot deputy">부</span>${esc(mgrB)}</span>
      </div>
    </div>
    <span class="cat-chip">${esc(parentItem.name)}</span>
  </div>
  <div class="trend-card-body">
    <div class="flow-row">
      <div class="flow-block asis"><div class="flow-tag asis-tag">AS-IS</div><div class="flow-text">${esc(tech.asis)}</div></div>
      <div class="flow-arrow-col"><div class="flow-arrow-icon">&#8594;</div></div>
      <div class="flow-block tobe"><div class="flow-tag tobe-tag">TO-BE</div><div class="flow-text">${esc(tech.tobe)}</div></div>
    </div>
    <div class="tc-cap-section">
      <div class="tc-cap-label">KETI 보유역량</div>
      <div class="tc-viewer-area">${capsHtml}</div>
    </div>
  </div>
  <div class="trend-card-foot">
    <div class="center-col"><div class="center-label">연구센터</div><div class="center-chips">${centersHtml}</div></div>
  </div>
  ${showEdit ? `<button class="tc-edit-btn" onclick="openTrendEditModal('${tech.id}')">편집</button>` : ''}
  ${pendingBadge}
</div>`;
}

function renderTrendTab(tabId, sections) {
  const container = document.getElementById(tabId);
  if (!container) return;
  const items = [];
  sections.forEach(sec => {
    MAP_DATA[sec].forEach(item => {
      const type = sectionType(sec);
      item.techs.forEach(tech => {
        items.push({ tech, item, type });
      });
    });
  });
  const categories = [...new Set(items.map(i => i.item.name))];
  const searchSvg = '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="#9CA3AF" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/></svg>';
  const filterHtml = `<div class="filter-bar" data-tab="${tabId}">
    <span class="filter-label">카테고리</span>
    <span class="filter-chip active" onclick="filterChip(this)">전체</span>
    ${categories.map(c => `<span class="filter-chip" onclick="filterChip(this)">${esc(c)}</span>`).join('')}
    <div class="filter-search">
      <span class="filter-search-icon">${searchSvg}</span>
      <input type="text" placeholder="기술명, 연구센터 검색..." oninput="applyTrendFilter(this.closest('.filter-bar'))">
    </div>
  </div>`;
  const gridId = tabId + 'Grid';
  const cardsHtml = items.map(i => buildTrendCard(i.tech, i.item, i.type)).join('');
  container.innerHTML = filterHtml + `<div class="trend-grid" id="${gridId}">${cardsHtml}</div>`;
}

function renderAllTrendTabs() {
  renderTrendTab('t-core', ['core']);
  renderTrendTab('t-base', ['base']);
  renderTrendTab('t-fusion', ['fusion_left','fusion_right']);
  updateTabCounts();
}

function updateTabCounts() {
  const counts = {
    core: MAP_DATA.core.reduce((s,i) => s + i.techs.length, 0),
    base: MAP_DATA.base.reduce((s,i) => s + i.techs.length, 0),
    fusion: [...MAP_DATA.fusion_left,...MAP_DATA.fusion_right].reduce((s,i) => s + i.techs.length, 0)
  };
  const btns = document.querySelectorAll('.tab-btn');
  const labels = [null,
    'AI 핵심기술 트렌드 및 KETI 보유 역량',
    'AI 기반기술 트렌드 및 KETI 보유 역량',
    'AI 융합기술 트렌드 및 KETI 보유 역량'
  ];
  const vals = [null, counts.core, counts.base, counts.fusion];
  for (let i = 1; i <= 3; i++) {
    if (btns[i]) btns[i].innerHTML = labels[i] + ` <span class="tab-count">${vals[i]}</span>`;
  }
}

// ─── 필터 ────────────────────────────────────────────────
function filterChip(el) {
  const bar = el.closest('.filter-bar');
  bar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  applyTrendFilter(bar);
}
function applyTrendFilter(bar) {
  const activeCat = bar.querySelector('.filter-chip.active');
  const cat = activeCat ? activeCat.textContent.trim() : '전체';
  const searchInput = bar.querySelector('.filter-search input');
  const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const grid = bar.nextElementSibling;
  if (!grid) return;
  grid.querySelectorAll('.trend-card').forEach(card => {
    const cardCat = card.dataset.cat || '';
    const catMatch = (cat === '전체' || cardCat === cat);
    const textMatch = !q || card.textContent.toLowerCase().includes(q);
    card.style.display = (catMatch && textMatch) ? '' : 'none';
  });
}

// ─── 역량맵 검색 ─────────────────────────────────────────
function filterMapCards(q) {
  q = (q || '').toLowerCase().trim();
  document.querySelectorAll('#techMap .mc').forEach(card => {
    card.style.display = (!q || card.textContent.toLowerCase().includes(q)) ? '' : 'none';
  });
  document.querySelectorAll('#techMap .map-panel').forEach(panel => {
    const visible = panel.querySelectorAll('.mc:not([style*="display: none"])');
    panel.style.opacity = (q && visible.length === 0) ? '0.3' : '';
  });
}

// ─── 태그 입력 헬퍼 ──────────────────────────────────────
function initTagInput(containerId, initialTags) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  container.dataset.tags = JSON.stringify(initialTags || []);
  (initialTags || []).forEach(tag => addTagChip(container, tag));
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '키워드 입력 후 Enter';
  input.className = 'tag-input-field';
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && this.value.trim()) {
      e.preventDefault();
      const val = this.value.trim();
      const tags = JSON.parse(container.dataset.tags);
      if (!tags.includes(val)) {
        tags.push(val);
        container.dataset.tags = JSON.stringify(tags);
        addTagChip(container, val, input);
      }
      this.value = '';
    }
  });
  container.appendChild(input);
}
function addTagChip(container, text, beforeEl) {
  const chip = document.createElement('span');
  chip.className = 'tag-chip';
  chip.innerHTML = esc(text) + '<button class="tag-remove" onclick="removeTag(this)">×</button>';
  chip.dataset.value = text;
  if (beforeEl) container.insertBefore(chip, beforeEl);
  else container.appendChild(chip);
}
function removeTag(btn) {
  const chip = btn.parentElement;
  const container = chip.parentElement;
  const val = chip.dataset.value;
  const tags = JSON.parse(container.dataset.tags);
  container.dataset.tags = JSON.stringify(tags.filter(t => t !== val));
  chip.remove();
}
function getTagValues(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return JSON.parse(container.dataset.tags || '[]');
}

// ─── 드롭다운 센터 선택 헬퍼 ────────────────────────────
function initCenterDropdown(containerId, selectedCenters) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  container.dataset.selected = JSON.stringify(selectedCenters || []);
  const chipsWrap = document.createElement('div');
  chipsWrap.className = 'center-selected-chips';
  container.appendChild(chipsWrap);
  (selectedCenters || []).forEach(c => addCenterChip(chipsWrap, c));

  const searchWrap = document.createElement('div');
  searchWrap.className = 'center-search-wrap';
  searchWrap.innerHTML = `
    <input type="text" class="center-search-input" placeholder="연구센터 검색..." onfocus="openCenterList(this)" oninput="filterCenterList(this)">
    <div class="center-list" style="display:none"></div>`;
  container.appendChild(searchWrap);
  buildCenterList(searchWrap.querySelector('.center-list'), container);

  document.addEventListener('click', function handler(e) {
    if (!container.contains(e.target)) {
      const list = container.querySelector('.center-list');
      if (list) list.style.display = 'none';
    }
  });
}
function buildCenterList(listEl, container) {
  const selected = JSON.parse(container.dataset.selected || '[]');
  listEl.innerHTML = CENTER_POOL.map(c => {
    const checked = selected.includes(c);
    return `<div class="center-list-item${checked ? ' disabled' : ''}" data-name="${esc(c)}" onclick="selectCenterItem(this)">${esc(c)}</div>`;
  }).join('');
}
function openCenterList(input) {
  const wrap = input.closest('.center-search-wrap');
  const list = wrap.querySelector('.center-list');
  const container = input.closest('.center-picker');
  buildCenterList(list, container);
  list.style.display = 'block';
  filterCenterList(input);
}
function filterCenterList(input) {
  const keyword = input.value.trim().toLowerCase();
  const list = input.closest('.center-search-wrap').querySelector('.center-list');
  list.querySelectorAll('.center-list-item').forEach(item => {
    const name = item.dataset.name.toLowerCase();
    item.style.display = name.includes(keyword) ? '' : 'none';
  });
}
function selectCenterItem(item) {
  if (item.classList.contains('disabled')) return;
  const name = item.dataset.name;
  const container = item.closest('.center-picker');
  const selected = JSON.parse(container.dataset.selected || '[]');
  if (selected.includes(name)) return;
  selected.push(name);
  container.dataset.selected = JSON.stringify(selected);
  addCenterChip(container.querySelector('.center-selected-chips'), name);
  item.classList.add('disabled');
  const input = container.querySelector('.center-search-input');
  if (input) { input.value = ''; filterCenterList(input); }
}
function addCenterChip(wrap, name) {
  const chip = document.createElement('span');
  chip.className = 'tag-chip center-tag';
  chip.innerHTML = esc(name) + '<button class="tag-remove" onclick="removeCenterTag(this)">x</button>';
  chip.dataset.value = name;
  wrap.appendChild(chip);
}
function removeCenterTag(btn) {
  const chip = btn.parentElement;
  const container = chip.closest('.center-picker');
  const val = chip.dataset.value;
  const selected = JSON.parse(container.dataset.selected);
  container.dataset.selected = JSON.stringify(selected.filter(c => c !== val));
  chip.remove();
  const list = container.querySelector('.center-list');
  if (list) buildCenterList(list, container);
}
function getCenterValues(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return JSON.parse(container.dataset.selected || '[]');
}

// ─── 역량맵 편집 모달 ───────────────────────────────────
function openEditModal(id) {
  const found = findItem(id);
  if (!found) return;
  const { item, section } = found;
  editingId = id;
  editingSection = section;
  document.getElementById('modalTitle').textContent = '편집: ' + item.name;
  document.getElementById('editName').value = item.name;
  document.getElementById('editCount').value = item.count;
  document.getElementById('editMgrA').value = item.mgr_a;
  document.getElementById('editMgrB').value = item.mgr_b;
  document.getElementById('deleteBtn').style.display = '';
  document.getElementById('sectionPickerRow').style.display = 'none';
  initTagInput('editTechTags', getTechTitles(item));
  initCenterDropdown('editCenterPicker', [...item.centers]);
  document.getElementById('editModal').classList.add('show');
}

function openAddModal(section) {
  editingId = null;
  editingSection = section || null;
  document.getElementById('modalTitle').textContent = '새 기술 추가';
  document.getElementById('editName').value = '';
  document.getElementById('editCount').value = '';
  document.getElementById('editMgrA').value = '';
  document.getElementById('editMgrB').value = '';
  document.getElementById('deleteBtn').style.display = 'none';
  document.getElementById('sectionPickerRow').style.display = section ? 'none' : '';
  if (section) document.getElementById('editSectionPick').value = section;
  initTagInput('editTechTags', []);
  initCenterDropdown('editCenterPicker', []);
  document.getElementById('editModal').classList.add('show');
}

function closeEditModal() {
  document.getElementById('editModal').classList.remove('show');
  editingId = null;
  editingSection = null;
}

function saveEditModal() {
  const name = document.getElementById('editName').value.trim();
  const count = parseInt(document.getElementById('editCount').value) || 0;
  const mgr_a = document.getElementById('editMgrA').value.trim();
  const mgr_b = document.getElementById('editMgrB').value.trim();
  const techTitles = getTagValues('editTechTags');
  const centers = getCenterValues('editCenterPicker');
  if (!name) { alert('기술명을 입력하세요.'); return; }

  if (editingId) {
    const found = findItem(editingId);
    if (found) {
      const item = found.item;
      item.name = name;
      item.count = count;
      item.mgr_a = mgr_a;
      item.mgr_b = mgr_b;
      item.centers = centers;
      syncTechs(item, techTitles);
      apiSaveMapItem(item, found.section, false);
    }
  } else {
    const targetSection = editingSection || document.getElementById('editSectionPick').value || 'core';
    const newItem = {
      id: uid(), name, count, centers, mgr_a, mgr_b,
      techs: techTitles.map(t => ({
        id: uid(), title: t, asis:'', tobe:'',
        caps:[], centers:[], mgr_a:'', mgr_b:''
      }))
    };
    MAP_DATA[targetSection].push(newItem);
    apiSaveMapItem(newItem, targetSection, true);
    if (techTitles.length > 0) {
      pendingTechDetails = newItem.techs.slice();
      openTechDetailSubModal(0);
    }
  }
  saveToStorage();
  renderMap();
  renderAllTrendTabs();
  closeEditModal();
}

function syncTechs(item, newTitles) {
  const existingTitles = item.techs.map(t => t.title);
  const removed = item.techs.filter(t => !newTitles.includes(t.title));
  const kept = item.techs.filter(t => newTitles.includes(t.title));
  const added = newTitles.filter(t => !existingTitles.includes(t));
  item.techs = kept;
  added.forEach(title => {
    const newTech = { id: uid(), title, asis:'', tobe:'', caps:[], centers:[], mgr_a:'', mgr_b:'' };
    item.techs.push(newTech);
  });
  if (added.length > 0) {
    pendingTechDetails = item.techs.filter(t => added.includes(t.title));
    setTimeout(() => openTechDetailSubModal(0), 300);
  }
}

function deleteMapItem() {
  if (!editingId) { closeEditModal(); return; }
  const label = document.getElementById('editName').value;
  if (!confirm('"' + label + '" 항목을 삭제하시겠습니까?\n포함된 유망기술 카드도 모두 삭제됩니다.')) return;
  const found = findItem(editingId);
  if (found) {
    MAP_DATA[found.section] = MAP_DATA[found.section].filter(i => i.id !== editingId);
    apiDeleteMapItem(editingId);
  }
  saveToStorage();
  renderMap();
  renderAllTrendTabs();
  closeEditModal();
}

// ─── 유망기술 상세 서브모달 ──────────────────────────────
let pendingTechDetails = [];
let currentTechDetailIdx = 0;

function openTechDetailSubModal(idx) {
  if (idx >= pendingTechDetails.length) {
    document.getElementById('techDetailModal').classList.remove('show');
    if (!USE_API) saveToStorage();
    renderMap();
    renderAllTrendTabs();
    return;
  }
  currentTechDetailIdx = idx;
  const tech = pendingTechDetails[idx];
  document.getElementById('tdmTitle').textContent = '유망기술 상세: ' + tech.title + ' (' + (idx+1) + '/' + pendingTechDetails.length + ')';
  document.getElementById('tdmTechTitle').value = tech.title;
  document.getElementById('tdmAsis').value = tech.asis || '';
  document.getElementById('tdmTobe').value = tech.tobe || '';
  document.getElementById('tdmMgrA').value = tech.mgr_a || '';
  document.getElementById('tdmMgrB').value = tech.mgr_b || '';
  initCenterDropdown('tdmCenterPicker', [...(tech.centers || [])]);
  initCapsList(tech.caps || []);
  // API 업로드용 섹션 정보 주입
  document.getElementById('tdmCapsList').dataset.section = editingSection || 'core';
  document.getElementById('techDetailModal').classList.add('show');
}

function initCapsList(caps) {
  const container = document.getElementById('tdmCapsList');
  container.innerHTML = '';
  caps.forEach((c, i) => addCapRow(container, c, i));
  if (caps.length === 0) addCapRow(container, {title:'',image:null}, 0);
}
function addCapRow(container, cap, idx) {
  const row = document.createElement('div');
  row.className = 'cap-edit-row';
  const hasImg = cap.image ? true : false;
  row.innerHTML = `
    <div class="cap-preview${hasImg ? ' has-img' : ''}">${hasImg ? `<img src="${esc(resolveImgUrl(cap.image))}" alt="">` : '<span class="cap-preview-empty">No Image</span>'}</div>
    <input type="text" class="form-input cap-title-input" value="${esc(cap.title || '')}" placeholder="보유역량 제목">
    <label class="cap-img-label">
      <input type="file" accept="image/*" style="display:none" onchange="capFileChange(this)">
      <span class="cap-img-btn">${hasImg ? '변경' : '이미지 선택'}</span>
    </label>
    <button class="cap-remove-btn" onclick="this.parentElement.remove()">×</button>`;
  if (cap.image) row.dataset.image = cap.image;
  container.appendChild(row);
}
function capFileChange(input) {
  const row  = input.closest('.cap-edit-row');
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    // 항상 base64로 즉시 미리보기
    row.dataset.image = dataUrl;
    const preview = row.querySelector('.cap-preview');
    preview.classList.add('has-img');
    preview.innerHTML = `<img src="${dataUrl}" alt="">`;
    row.querySelector('.cap-img-btn').textContent = '변경';

    // API 모드: 서버에 파일 업로드 후 실제 URL로 교체
    if (USE_API) {
      const capsList = input.closest('[data-section]');
      const section  = capsList ? capsList.dataset.section : 'core';
      const title    = row.querySelector('.cap-title-input')
                         ? row.querySelector('.cap-title-input').value.trim()
                         : '';
      // 업로드 중 표시 → 저장 버튼 클릭 시 대기 감지용
      row.dataset.uploading = '1';
      const btn = row.querySelector('.cap-img-btn');
      if (btn) btn.textContent = '업로드 중...';

      _uploadCapFile(file, title || 'image', section).then(url => {
        delete row.dataset.uploading;
        if (btn) btn.textContent = '변경';
        if (url) {
          row.dataset.image = url;
          preview.innerHTML = `<img src="${resolveImgUrl(url)}" alt="">`;
          preview.classList.add('has-img');
        }
      }).catch(() => {
        delete row.dataset.uploading;
        if (btn) btn.textContent = '재시도';
      });
    }
  };
  reader.readAsDataURL(file);
}

async function _uploadCapFile(file, title, section) {
  try {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', title);
    fd.append('category', section);
    const res  = await fetch(API_BASE + '/api/image/upload', { method: 'POST', body: fd });
    if (!res.ok) throw new Error('upload ' + res.status);
    const data = await res.json();
    return data.image_url || null;
  } catch(e) {
    console.warn('이미지 서버 업로드 실패 (로컬 미리보기 유지):', e.message);
    return null;
  }
}
function addCapRowBtn() {
  const container = document.getElementById('tdmCapsList');
  addCapRow(container, {title:'',image:null}, container.children.length);
}
function getCapValues() {
  const rows = document.querySelectorAll('#tdmCapsList .cap-edit-row');
  const caps = [];
  rows.forEach(row => {
    const title = row.querySelector('.cap-title-input').value.trim();
    if (title) {
      caps.push({ title, image: row.dataset.image || null });
    }
  });
  return caps;
}

async function saveTechDetail() {
  // 업로드 중인 이미지가 있으면 완료 대기
  const uploadingRows = document.querySelectorAll('#tdmCapsList .cap-edit-row[data-uploading="1"]');
  if (uploadingRows.length > 0) {
    alert('이미지 업로드 중입니다. 잠시 후 다시 저장해주세요. (버튼이 "변경"으로 바뀌면 완료)');
    return;
  }

  const tech = pendingTechDetails[currentTechDetailIdx];
  tech.title = document.getElementById('tdmTechTitle').value.trim() || tech.title;
  tech.asis = document.getElementById('tdmAsis').value.trim();
  tech.tobe = document.getElementById('tdmTobe').value.trim();
  tech.mgr_a = document.getElementById('tdmMgrA').value.trim();
  tech.mgr_b = document.getElementById('tdmMgrB').value.trim();
  tech.centers = getCenterValues('tdmCenterPicker');
  tech.caps = getCapValues();
  if (USE_API) {
    const foundItem = findTech(tech.id);
    const itemId = foundItem ? foundItem.item.id : null;
    if (itemId) {
      // 이미 DB에 존재하면 PUT, 신규면 POST
      const exists = await fetch(API_BASE + `/api/techs/${tech.id}`).then(r => r.ok).catch(() => false);
      const ok = await apiSaveTech(tech, itemId, !exists);
      if (!ok) console.warn('saveTechDetail: 저장 실패 (tech.id=', tech.id, ')');
    }
  } else {
    saveToStorage();
  }
  openTechDetailSubModal(currentTechDetailIdx + 1);
}
function skipTechDetail() {
  openTechDetailSubModal(currentTechDetailIdx + 1);
}

// ─── 트렌드 카드 편집 모달 ──────────────────────────────
function openTrendEditModal(techId) {
  const found = findTech(techId);
  if (!found) return;
  const { tech, item } = found;
  document.getElementById('trendModalTitle').textContent = '편집: ' + tech.title;
  document.getElementById('tEditTitle').value = tech.title;
  document.getElementById('tEditCat').value = item.name;
  document.getElementById('tEditCat').disabled = true;
  document.getElementById('tEditAsis').value = tech.asis;
  document.getElementById('tEditTobe').value = tech.tobe;
  document.getElementById('tEditMgrA').value = tech.mgr_a || item.mgr_a;
  document.getElementById('tEditMgrB').value = tech.mgr_b || item.mgr_b;
  initCenterDropdown('tEditCenterPicker', [...tech.centers]);
  initCapsList_trend(tech.caps);
  // API 업로드용 섹션 정보 주입
  const tSection = Object.entries(MAP_DATA).find(([,arr]) => arr.some(i => i.techs.some(t => t.id === techId)));
  document.getElementById('tEditCapsList').dataset.section = tSection ? tSection[0] : 'core';
  document.getElementById('trendEditModal').classList.add('show');
  document.getElementById('trendEditModal').dataset.techId = techId;
}

function initCapsList_trend(caps) {
  const container = document.getElementById('tEditCapsList');
  container.innerHTML = '';
  caps.forEach((c, i) => addCapRow(container, c, i));
  if (caps.length === 0) addCapRow(container, {title:'',image:null}, 0);
}
function addTrendCapRowBtn() {
  const container = document.getElementById('tEditCapsList');
  addCapRow(container, {title:'',image:null}, container.children.length);
}
function getTrendCapValues() {
  const rows = document.querySelectorAll('#tEditCapsList .cap-edit-row');
  const caps = [];
  rows.forEach(row => {
    const title = row.querySelector('.cap-title-input').value.trim();
    if (title) caps.push({ title, image: row.dataset.image || null });
  });
  return caps;
}

function closeTrendEditModal() {
  document.getElementById('trendEditModal').classList.remove('show');
}

async function saveTrendEditModal() {
  // 업로드 중인 이미지가 있으면 완료 대기
  const uploadingRows = document.querySelectorAll('#tEditCapsList .cap-edit-row[data-uploading="1"]');
  if (uploadingRows.length > 0) {
    alert('이미지 업로드 중입니다. 잠시 후 다시 저장해주세요. (버튼이 "변경"으로 바뀌면 완료)');
    return;
  }

  const techId = document.getElementById('trendEditModal').dataset.techId;
  const found = findTech(techId);
  if (!found) return;
  const tech = found.tech;
  tech.title = document.getElementById('tEditTitle').value.trim() || tech.title;
  tech.asis = document.getElementById('tEditAsis').value.trim();
  tech.tobe = document.getElementById('tEditTobe').value.trim();
  tech.mgr_a = document.getElementById('tEditMgrA').value.trim();
  tech.mgr_b = document.getElementById('tEditMgrB').value.trim();
  tech.centers = getCenterValues('tEditCenterPicker');
  tech.caps = getTrendCapValues();
  if (USE_API) {
    const ok = await apiSaveTech(tech, found.item.id, false);
    if (!ok) {
      alert('저장에 실패했습니다. 콘솔(F12)에서 오류를 확인해주세요.');
      return;
    }
  } else {
    saveToStorage();
  }
  renderMap();
  renderAllTrendTabs();
  closeTrendEditModal();
}

function deleteTrendCard() {
  const techId = document.getElementById('trendEditModal').dataset.techId;
  const found = findTech(techId);
  if (!found) return;
  if (!confirm('"' + found.tech.title + '" 카드를 삭제하시겠습니까?\n역량맵의 유망기술에서도 제거됩니다.')) return;
  found.item.techs = found.item.techs.filter(t => t.id !== techId);
  if (USE_API) {
    apiDeleteTech(techId);
  } else {
    saveToStorage();
  }
  renderMap();
  renderAllTrendTabs();
  closeTrendEditModal();
}

// ─── 관리자 토글 ─────────────────────────────────────────
function toggleAdmin() {
  if (currentUser) {
    // 이미 로그인 상태 → 로그아웃
    logout();
  } else {
    // 비로그인 → 로그인 모달 표시
    if (USE_API) {
      openLoginModal();
    } else {
      // localStorage 모드 (로컬 파일): 기존처럼 단순 토글
      isAdmin = !isAdmin;
      if (isAdmin) {
        document.getElementById('adminBtn').classList.add('is-admin');
        document.getElementById('adminBtnText').textContent = '편집 모드 ON';
        document.getElementById('adminBanner').classList.add('show');
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = '');
        document.body.classList.add('admin-mode');
      } else {
        document.getElementById('adminBtn').classList.remove('is-admin');
        document.getElementById('adminBtnText').textContent = '관리자 모드';
        document.getElementById('adminBanner').classList.remove('show');
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
        document.body.classList.remove('admin-mode');
      }
      renderMap();
      renderAllTrendTabs();
    }
  }
}

// ─── 탭 / 네비게이션 ────────────────────────────────────
var TAB_LABELS = {
  't-overview': 'KETI AI 기술·인력 역량 현황',
  't-core':     'AI 핵심기술 트렌드 및 KETI 보유 역량',
  't-base':     'AI 기반기술 트렌드 및 KETI 보유 역량',
  't-fusion':   'AI 융합기술 트렌드 및 KETI 보유 역량'
};
var _currentTechName = 'AI';

function updateBreadcrumbTab(tabId) {
  var bc = document.querySelector('.breadcrumb');
  if (!bc) return;
  var label = TAB_LABELS[tabId] || '';
  if (label) {
    bc.innerHTML = '전략기술 역량 대시보드 <span>&rsaquo; ' + _currentTechName + ' &rsaquo; ' + label + '</span>';
  } else {
    bc.innerHTML = '전략기술 역량 대시보드 <span>&rsaquo; ' + _currentTechName + '</span>';
  }
}

function switchTab(el, tabId) {
  hideAdminPages();
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  updateBreadcrumbTab(tabId);
  var mainEl = document.querySelector('main.main');
  if (mainEl && mainEl.classList.contains('non-ai-mode')) return;
  ['t-overview','t-core','t-base','t-fusion'].forEach(id => {
    const el2 = document.getElementById(id);
    if (el2) el2.style.display = 'none';
  });
  const target = document.getElementById(tabId);
  if (target) {
    if (tabId === 't-overview') {
      target.style.display = 'flex';
      target.style.flex = '1';
      target.style.minHeight = '0';
      target.style.overflowY = 'hidden';
    } else {
      target.style.display = 'block';
      target.style.flex = '1';
      target.style.minHeight = '0';
      target.style.overflowY = 'auto';
      target.style.padding = '4px 2px 20px';
    }
  }
}

function selectTech(el, name) {
  hideAdminPages();
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  _currentTechName = name;
  document.getElementById('pageTitle').innerHTML =
    name + ' 유망기술 트렌드 및 KETI 보유역량 <span class="page-badge">v2.0</span>';
  var metaEl = document.querySelector('.page-meta');
  if (name === 'AI') {
    metaEl.style.display = '';
    var totalTechs = allSections().reduce((s,sec) => s + MAP_DATA[sec].reduce((ss,i) => ss + i.techs.length, 0), 0);
    metaEl.innerHTML = '<span class="online-dot"></span><span>최종 업데이트: 2025.12.10</span><span class="meta-sep">|</span><span>' + MAP_DATA.core.length + '개 핵심 · ' + MAP_DATA.base.length + '개 기반 · ' + (MAP_DATA.fusion_left.length + MAP_DATA.fusion_right.length) + '개 융합</span>';
  } else {
    metaEl.style.display = 'none';
  }
  var mainEl = document.querySelector('main.main');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  var firstBtn = document.querySelector('.tab-btn');
  if (firstBtn) firstBtn.classList.add('active');
  document.querySelectorAll('.main > [id^="t-"]').forEach(t => { t.style.display = 'none'; });
  var ov = document.getElementById('t-overview');
  if (ov) ov.style.display = '';
  if (name === 'AI') {
    if (mainEl) mainEl.classList.remove('non-ai-mode');
    updateBreadcrumbTab('t-overview');
  } else {
    document.getElementById('phTitle').textContent = name + ' 기술 트렌드 & 보유역량';
    if (mainEl) mainEl.classList.add('non-ai-mode');
    document.querySelector('.breadcrumb').innerHTML =
      '전략기술 역량 대시보드 <span>&rsaquo; ' + name + '</span>';
  }
}


// ─── 관리 페이지: 변경 이력 / 담당자 권한 ────────────────
function showAdminPage(pageId) {
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(p => p.style.display = 'none');
  document.getElementById(pageId).classList.add('active');
  if (pageId === 'approvalPage') loadApprovals();
  if (pageId === 'permPage')     loadUsers();
}

function hideAdminPages() {
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
}

async function loadApprovals() {
  if (!USE_API || !currentUser) return;
  const status = document.getElementById('approvalStatusFilter').value;
  try {
    const res  = await fetch(API_BASE + `/api/approvals?status=${status}`, { headers: authHeaders() });
    const list = await res.json();
    const area = document.getElementById('approvalList');
    if (!list.length) {
      area.innerHTML = '<div style="color:var(--text-4);padding:20px;text-align:center">변경사항이 없습니다.</div>';
      return;
    }
    let html = `<table class="admin-table"><thead><tr>
      <th>요청자</th><th>대상</th><th>유형</th><th>작업</th><th>요청일</th><th>상태</th>
      ${status === 'pending' && currentUser.role === 'admin' ? '<th>처리</th>' : ''}
    </tr></thead><tbody>`;
    list.forEach(pc => {
      const date = new Date(pc.created_at).toLocaleString('ko-KR');
      const actionLabel = {CREATE:'추가',UPDATE:'수정',DELETE:'삭제'}[pc.action] || pc.action;
      const targetName = pc.after_data?.title || pc.after_data?.name || pc.target_id;
      html += `<tr>
        <td>${esc(pc.requester_name || '')}</td>
        <td>${esc(targetName)}</td>
        <td>${esc(pc.target_type)}</td>
        <td>${esc(actionLabel)}</td>
        <td>${date}</td>
        <td><span class="pending-badge" style="background:${
          pc.status==='pending'?'#ED8936':pc.status==='approved'?'#48BB78':'#FC8181'
        }">${pc.status==='pending'?'대기':pc.status==='approved'?'승인':'반려'}</span></td>
        ${status === 'pending' && currentUser.role === 'admin'
          ? `<td>
              <button class="admin-btn approve" onclick="approveChange(${pc.id})">승인</button>
              <button class="admin-btn reject" onclick="rejectChange(${pc.id})" style="margin-left:4px">반려</button>
             </td>` : ''}
      </tr>`;
    });
    html += '</tbody></table>';
    area.innerHTML = html;
  } catch(e) {
    document.getElementById('approvalList').innerHTML = '<div style="color:#E53E3E">로드 실패: ' + e.message + '</div>';
  }
}

async function approveChange(id) {
  if (!confirm('이 변경사항을 승인하시겠습니까?')) return;
  try {
    const res = await fetch(API_BASE + `/api/approvals/${id}/approve`, {
      method: 'POST', headers: authJsonHeaders(), body: JSON.stringify({})
    });
    if (res.ok) {
      alert('승인 완료! 변경사항이 반영되었습니다.');
      loadApprovals();
      await loadFromStorage();
      loadPendingCards();
      renderMap();
      renderAllTrendTabs();
    } else {
      const err = await res.json();
      alert('승인 실패: ' + (err.error || ''));
    }
  } catch(e) { alert('승인 처리 오류: ' + e.message); }
}

async function rejectChange(id) {
  const comment = prompt('반려 사유를 입력해주세요:');
  if (comment === null) return;
  try {
    const res = await fetch(API_BASE + `/api/approvals/${id}/reject`, {
      method: 'POST', headers: authJsonHeaders(), body: JSON.stringify({ comment })
    });
    if (res.ok) { alert('반려 완료.'); loadApprovals(); loadPendingCards(); }
    else { const err = await res.json(); alert('반려 실패: ' + (err.error || '')); }
  } catch(e) { alert('반려 처리 오류: ' + e.message); }
}

// ─── 담당자 권한 설정 ─────────────────────────────────────
async function loadUsers() {
  if (!USE_API || !currentUser || currentUser.role !== 'admin') return;
  try {
    const res  = await fetch(API_BASE + '/api/users', { headers: authHeaders() });
    const list = await res.json();
    const area = document.getElementById('userListArea');
    let html = `<table class="admin-table"><thead><tr>
      <th>ID</th><th>이름</th><th>이메일</th><th>역할</th><th>활성</th><th>관리</th>
    </tr></thead><tbody>`;
    list.forEach(u => {
      html += `<tr>
        <td>${u.id}</td>
        <td>${esc(u.name)}</td>
        <td>${esc(u.email || '-')}</td>
        <td><span style="font-weight:600;color:${u.role==='admin'?'#E53E3E':'#3182CE'}">${u.role.toUpperCase()}</span></td>
        <td>${u.is_active ? 'O' : 'X'}</td>
        <td>
          <button class="admin-btn" onclick='openEditUserModal(${JSON.stringify(u)})'>수정</button>
          ${u.is_active ? `<button class="admin-btn reject" onclick="deactivateUser(${u.id})" style="margin-left:4px">비활성화</button>` : ''}
        </td>
      </tr>`;
    });
    html += '</tbody></table>';
    area.innerHTML = html;
  } catch(e) {
    document.getElementById('userListArea').innerHTML = '<div style="color:#E53E3E">로드 실패: ' + e.message + '</div>';
  }
}

function openAddUserModal() {
  document.getElementById('userModalTitle').textContent = '사용자 추가';
  document.getElementById('umUserId').value = '';
  document.getElementById('umName').value = '';
  document.getElementById('umEmail').value = '';
  document.getElementById('umPassword').value = '';
  document.getElementById('umPassword').placeholder = '비밀번호';
  document.getElementById('umRole').value = 'manager';
  document.getElementById('userModal').classList.add('show');
}

function openEditUserModal(u) {
  document.getElementById('userModalTitle').textContent = '사용자 수정: ' + u.name;
  document.getElementById('umUserId').value = u.id;
  document.getElementById('umName').value = u.name;
  document.getElementById('umEmail').value = u.email || '';
  document.getElementById('umPassword').value = '';
  document.getElementById('umPassword').placeholder = '변경 시에만 입력';
  document.getElementById('umRole').value = u.role;
  document.getElementById('userModal').classList.add('show');
}

async function saveUser() {
  const id   = document.getElementById('umUserId').value;
  const body = {
    name:     document.getElementById('umName').value.trim(),
    email:    document.getElementById('umEmail').value.trim(),
    role:     document.getElementById('umRole').value,
    password: document.getElementById('umPassword').value
  };
  if (!body.name) { alert('이름을 입력해주세요.'); return; }

  try {
    const isNew = !id;
    if (isNew && !body.password) { alert('비밀번호를 입력해주세요.'); return; }
    if (!isNew && !body.password) delete body.password;

    const url    = isNew ? API_BASE + '/api/users' : API_BASE + `/api/users/${id}`;
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(url, { method, headers: authJsonHeaders(), body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) { alert(data.error || '저장 실패'); return; }
    document.getElementById('userModal').classList.remove('show');
    loadUsers();
  } catch(e) { alert('저장 오류: ' + e.message); }
}

async function deactivateUser(id) {
  if (!confirm('이 사용자를 비활성화하시겠습니까?')) return;
  try {
    await fetch(API_BASE + `/api/users/${id}`, { method: 'DELETE', headers: authHeaders() });
    loadUsers();
  } catch(e) { alert('비활성화 오류: ' + e.message); }
}

// ─── 초기화 ──────────────────────────────────────────────
(async function init() {
  // 저장된 토큰으로 세션 복구
  const savedToken = localStorage.getItem('authToken');
  const savedUser  = localStorage.getItem('currentUser');
  if (savedToken && savedUser) {
    authToken   = savedToken;
    currentUser = JSON.parse(savedUser);
    applyLoginState();
  }

  await loadFromStorage();
  renderMap();
  renderAllTrendTabs();
  const _ov = document.getElementById('t-overview');
  if (_ov) _ov.style.display = 'flex';
  updateBreadcrumbTab('t-overview');
})();
