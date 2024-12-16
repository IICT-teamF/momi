let l_Image1, l_Image2, l_Image3, l_bubble; // 이미지 변수 선언
let l_selectedImage = null; // 선택된 이미지 번호
let app; //클래스 선언할 때 사용할 변수
let imageUrl = ''; //이미지 URL 전역변수
let num; //선택된 이미지의 인덱스
let user_prompt; //사용자가 프롬프트에 입력한 내용
let svgImage; // 백그라운드
let yun_case = 1;
let project_font;
let previousCase = 1; // 이전 yun_case 값 저장
let section2, reset2, framebox, next2, previous2, picframe, chatting2, promp2;  // 이미지를 저장할 변수 선언

let isHwanInitialized = false

// 지윤
let gbox, bbox, pbox;
let Fimg1, Fimg2, Fimg3, Fimg4, Fimg6;
let FnextScreen = false;
let FmiddleScreen = false; // 중간 화면 상태
let FnextScreen2 = false; // 두 번째 화면에서 세 번째 화면으로
let Fimg2X, Fimg2Y, Fimg2Width, Fimg2Height;
let FbuttonX, FbuttonY, FbuttonSize;
let Fimg3Y; // Fimg3의 초기 y좌표
let FtransitionSpeed = 10; // 애니메이션 속도
let Fimg1X, Fimg1Y; // Fimg1의 좌표
let Fimg4Alpha = 255; // 투명도 (불투명)
let FintroImage, Fsection1ButtonImage; // 추가 이미지
let FshowImages = false; // 이미지 표시 여부
let vdes;
let vwave;
let korstars, clouds;

// 지우
let stage = 0; // 현재 단계
let selectedOption = -1; // 사용자가 선택한 옵션
let artworkImages = []; // 옵션별 작품 이미지
let actualArtworks = []; // 실제 작품 이미지
let quizImages = []; // 퀴즈 이미지 배열
let narrationSounds = []; // 나레이션 사운드 배열
let currentSound; // 현재 재생 중인 사운드
let narrationFinished = false; // 나레이션 종료 여부
let quizStage = "quizscreen"; // 퀴즈 단계
let selectedQuizOption = -1;

// 버튼 및 이미지 크기
let resetImgWidth = 100;
let resetImgHeight = 50;
let arrowImg, resetImg, nextImg, customFont;
let backgroundImg, section1Img, replayImg; // 배경 및 버튼 이미지

//더 알아보기 부분
let more, eye, pro, newImage1, newImage2, link;  // 이미지를 저장할 변수 선언
let isInfo1 = false;  // info1 화면 여부를 확인하는 변수
let isHoveringPrevious2 = false;  // previous2 이미지 위에 마우스가 있는지 확인하는 변수
let isHoveringLink = false;  // link 이미지 위에 마우스가 있는지 확인하는 변수

// Proxy URL 선언
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // 공개 프록시 URL

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);  // 캔버스 크기 변경
  }

function preload() {
    // 이미지 로드
    l_Image1 = loadImage('asset/painting1.svg');
    l_Image2 = loadImage('asset/painting2.svg');
    l_Image3 = loadImage('asset/painting3.svg');
    l_bubble = loadImage('asset/bubble.png');
    project_font = loadFont('assets/BareunBatangM.ttf');

    //지윤님 이미지 로드
    section2 = loadImage('section2/section2.svg');  // 첫 번째 이미지 로드 (2전시관 로고)
    framebox = loadImage('section2/framebox.svg');  // 세 번째 이미지 로드 (멘트 상자)

    //gbox = loadImage('section2/greenbox.svg');  // 여섯 번째 이미지 로드 -> l_Image1로 바꿀 것
    //bbox = loadImage('section2/bluebox.svg');  // 일곱 번째 이미지 로드 -> l_Image2로 바꿀 것
    //pbox = loadImage('section2/purplebox.svg');  // 여덟 번째 이미지 로드 -> l_Image3으로 바꿀 것
    promp2 = loadImage('section2/prompter.svg');  // 열한 번째 이미지 로드
    chatting2 = loadImage('section2/chatting2.svg');  // 열 번째 이미지 로드
    

    //우선 사용 안하는 이미지
    reset2 = loadImage('section2/reset2.svg');  // 두 번째 이미지 로드 (리셋 버튼)
    next2 = loadImage('section2/next2.svg');  // 네 번째 이미지 로드 (뒤로 가기)
    previous2 = loadImage('section2/previous2.svg');  // 다섯 번째 이미지 로드 (앞으로 가기))
    picframe = loadImage('asset/blank.svg');  // 아홉 번째 이미지 로드 (필요 없을 듯)

    more = loadImage('assets/morebutton.svg');  // first image (more 버튼)
    reset2 = loadImage('assets/reset2.svg');  // 두 번째 이미지 로드
    framebox = loadImage('assets/diec.svg');  // 세 번째 이미지 로드
    previous2 = loadImage('assets/previous2.svg');  // 네 번째 이미지 로드
    eye = loadImage('assets/eye.svg');  // eye 이미지 로드
    pro = loadImage('assets/pro.svg');  // pro 이미지 로드
    newImage1 = loadImage('assets/definition.svg');  // 추가할 첫 번째 이미지
    newImage2 = loadImage('assets/category.svg');  // 추가할 두 번째 이미지
    link = loadImage('assets/link.svg');  // link 이미지 로드



    // 지우: 이미지 및 사운드 로드
  for (let i = 0; i < 3; i++) {
    actualArtworks[i] = loadImage(`assets/actual${i + 1}.png`);
    narrationSounds[i] = loadSound(`assets/narration${i + 1}.mp3`);
  }
  for (let quiz = 1; quiz <= 3; quiz++) {
    for (let i = 1; i <= 4; i++) {
      quizImages.push(loadImage(`assets/quiz${quiz}_${i}.png`));
    }
  }
  arrowImg = loadImage("assets/next1.svg");
  resetImg = loadImage("assets/reset1.svg");
  nextImg = loadImage("assets/2ndbutton.svg");
  customFont = loadFont("assets/BareunBatangM.ttf");
  backgroundImg = loadImage("assets/background.png");
  section1Img = loadImage("assets/section1.svg");
  replayImg = loadImage("assets/replay.svg");

  // 지윤: 이미지 로드
  Fimg1 = loadImage('assets/house.svg');
  Fimg2 = loadImage('assets/door.svg');
  Fimg3 = loadImage('assets/signboard.svg');
  Fimg4 = loadImage('assets/Frame 5.svg');
  FintroImage = loadImage('assets/introduction.svg');
  Fsection1ButtonImage = loadImage('assets/Fsection1.svg');

  gbox = loadImage('assets/greenbox.svg'); // 여섯 번째 이미지 로드
  bbox = loadImage('assets/bluebox.svg');  // 일곱 번째 이미지 로드
  pbox = loadImage('assets/purplebox.svg');  // 여덟 번째 이미지 로드
  vdes = loadImage('assets/voicedes.svg');  // 아홉 번째 이미지 로드
  vwave = loadImage('assets/voicewave.svg');  // 열 번째 이미지 로드

   //새로운 이미지
   korstars = loadImage('assets/korstars.svg');
   clouds = loadImage('assets/clouds.svg');

}

function setup() {
    /*
    textFont(project_font);
    textSize(30);

    */
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER);
    textFont(customFont);
    textSize(40);
    fill(0); // 텍스트 색상을 검정으로 기본 설정
  
    // 초기 값 설정
    Fimg3Y = windowHeight / 5.9;
  
    // 여섯 번째 이미지 크기 계산 및 배열에 추가
    if (gbox) {
      let scaleFactor6 = min(windowWidth, windowHeight) * 0.28 / max(gbox.width, gbox.height);
      let newWidth6 = gbox.width * scaleFactor6;
      let newHeight6 = gbox.height * scaleFactor6;
      artworkImages.push({ img: gbox, width: newWidth6, height: newHeight6 });
    } else {
      console.error("gbox is not loaded");
    }
  
    // 일곱 번째 이미지 크기 계산 및 배열에 추가
    if (bbox) {
      let scaleFactor7 = min(windowWidth, windowHeight) * 0.38 / max(bbox.width, bbox.height);
      let newWidth7 = bbox.width * scaleFactor7;
      let newHeight7 = bbox.height * scaleFactor7;
      artworkImages.push({ img: bbox, width: newWidth7, height: newHeight7 });
    } else {
      console.error("bbox is not loaded");
    }
  
    // 여덟 번째 이미지 크기 계산 및 배열에 추가
    if (pbox) {
      let scaleFactor8 = min(windowWidth, windowHeight) * 0.3 / max(pbox.width, pbox.height);
      let newWidth8 = pbox.width * scaleFactor8;
      let newHeight8 = pbox.height * scaleFactor8;
      artworkImages.push({ img: pbox, width: newWidth8, height: newHeight8 });
    } else {
      console.error("pbox is not loaded");
    }
  
      // 이미지 9
      let scaleFactor9 = min(windowWidth, windowHeight) * 0.7 / max(vdes.width, vdes.height);
      let newWidth9 = vdes.width * scaleFactor9;
      let newHeight9 = vdes.height * scaleFactor9;
    
      // vdes의 xPos를 가로 중앙으로 설정
      let xPos9 = (windowWidth - newWidth9) / 2;  // 가로 가운데 위치 조정
      let yPos9 = windowHeight * 2.4 / 10;
      image(vdes, xPos9, yPos9, newWidth9, newHeight9);
    
      // 이미지 10
      let scaleFactor10 = min(windowWidth, windowHeight) / max(vwave.width, vwave.height);
      let newWidth10 = vwave.width * scaleFactor10;
      let newHeight10 = vwave.height * scaleFactor10;
    
      // vwave을 화면 정중앙에 위치시키기
      let xPos10 = (windowWidth - newWidth10) / 2;  // 가로 중앙
      let yPos10 = (windowHeight - newHeight10) / 2;  // 세로 중앙
      image(vwave, xPos10, yPos10, newWidth10, newHeight10);
  
    // 디버깅용 출력
     console.log("artworkImages:", artworkImages);
    //hwan_selectingImage();

     //supabase 설정
     supabase = createClient(
        'https://fogmydcroufvihnwmvdv.supabase.co', //project url
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ215ZGNyb3VmdmlobndtdmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyOTA5NTksImV4cCI6MjA0ODg2Njk1OX0.TYNQey0W0BFUJ1R-l9fc_1TFOXrV21kKPmBgWHpckTA' //api key
      );
}

function draw() {

// 배경 설정
if (stage === 0 || stage === 1 || stage === 2) {
    background(255); // case 0, 1, 2에서는 흰색 배경
  } else if (stage >= 4 && stage <=10 ) {
    background(255, 228, 110); // 그 외 단계에서는 기존 배경색
  }

  // 지윤 화면 처리
  if (stage < 4) {
    if (!FnextScreen && !FmiddleScreen) {
      drawFirstScreen(); // 첫 번째 화면
    } else if (FmiddleScreen) {
      drawMiddleScreen(); // 중간 화면
    } else if (FnextScreen && !FnextScreen2) {
      drawSecondScreen(); // 두 번째 화면
    }
  }

  // 지우 화면 처리
  if (stage >= 4) {
    switch (stage) {
      case 4:
        drawIntroScreen(); // 나레이션 소개 화면
        break;
      case 5:
        drawArtworkSelection(); // 그림 선택 화면
        break;
      case 6:
        drawNarrationScreen(); // 나레이션 화면
        break;
      case 7:
        drawQuestionScreen(); // 질문 화면
        break;
      case 8:
        drawQuizScreen(); // 퀴즈 화면
        break;
      case 9:
        drawAnswerScreen(); // 정답 화면
        break;
      case 10:
        drawFinalScreen(); // 마지막 화면
        break;
      case 11:
        textSize(25);
        if (!isHwanInitialized) {
            hwan_selectingImage();
            isHwanInitialized = true; // 플래그 업데이트
          }
        //drawSecondExhibitionScreen(); // 두 번째 전시관 화면
        if (previousCase !== yun_case) {
            previousCase = yun_case;
            // yun_case에 따라 화면 변경
            switch (yun_case) {
                case 1:
                    hwan_selectingImage();
                    break;
                case 2:
                    //이미지 넣기
                    choi_image();
                    if (!case2Viewer) {
                        case2Viewer = new Case2Viewer();
                        case2Viewer.setup(num); // num은 선택된 이미지의 인덱스
                    }
                    break;
                default:
                    hwan_selectingImage();
                    break;
            }
        }
        break;
      case 12:
        if (isInfo1) {
          drawInfo1Screen();  // info1 화면 그리기
        } else {
          drawLastScreen();  // 메인 화면 그리기
        }
        break;
      default:
        fill(255, 0, 0); // 오류 발생 시 빨간색 텍스트
        textAlign(CENTER, CENTER);
        text("오류 발생. 다시 시도해주세요.", width / 2, height / 2);
    }
  }

  // 공통 UI 요소
  if (stage >= 4 && stage <=10) {
    drawArrowButton(); // 화살표 버튼
    drawResetButton(); // 리셋 버튼
    drawSection1Button(); // 섹션1 버튼
  }
}

function hwan_selectingImage() {
    
    createCanvas(windowWidth, windowHeight); // 화면 크기 설정
    background(255, 194, 180, 128);  // 배경색 설정
    tint(255, 255, 255, 255); // 투명도 50% 설정 (알파값 128)


    // section2 로고
    let scaleFactor1 = min(windowWidth, windowHeight) * 0.15 / max(section2.width, section2.height);
    let newWidth1 = section2.width * scaleFactor1;
    let newHeight1 = section2.height * scaleFactor1;
    image(section2, windowWidth / 80, windowHeight / 80, newWidth1, newHeight1);


    let scaleFactor3 = min(windowWidth, windowHeight) * 1.1 / max(framebox.width, framebox.height);
    let newWidth3 = framebox.width * scaleFactor3;
    let newHeight3 = framebox.height * scaleFactor3;
    let xPos3 = windowWidth / 2 - newWidth3 / 2;
    let yPos3 = windowHeight / 7;
    image(framebox, xPos3, yPos3, newWidth3, newHeight3);

    textFont(project_font);
    textAlign(CENTER, CENTER);
    fill(0);
    text('2전시관은 직접 작품을 설명해보는 공간이에요. \n 그림을 보고 있지 않은 누군가에게 화면에 나타난 그림을 설명해보세요. \n 관람자님의 설명만으로 어떤 그림이 만들어지는지도 확인해보실 수 있습니다.',width/2,198)
    imageMode(CENTER);
    image(l_Image1, width / 4, height / 2 + 60, 300, 300); // 첫 번째 이미지
    image(l_Image2, width / 2, height / 2 + 60 , 300, 300); // 두 번째 이미지
    image(l_Image3, (3 * width) / 4, height / 2 + 60 , 300, 300); // 세 번째 이미지
    text('설명하고 싶은 그림을 선택해주세요!',width/2,height-150)
}

function choi_image() {
    createCanvas(windowWidth, windowHeight); // 화면 크기 설정
    background(255, 194, 180, 128);  // 배경색 설정
    tint(255, 255, 255, 255);
    // section2 로고
    imageMode(CORNER)
    let scaleFactor1 = min(windowWidth, windowHeight) * 0.15 / max(section2.width, section2.height);
    let newWidth1 = section2.width * scaleFactor1;
    let newHeight1 = section2.height * scaleFactor1;
    image(section2, windowWidth / 80, windowHeight / 80, newWidth1, newHeight1);
    imageMode(CENTER)
}

class ImageGeneratorApp {
    constructor() {
        this.inputBoxes = [];
        this.initialValues = '';
        this.labels = [];
        this.bubble = l_bubble;
        this.generateButton = null;
        this.imageUrl = '';
        this.selectedImage = null;
        this.inputAllBoxes = [];

        // 생성된 이미지의 위치와 크기
        
        this.imgX = width / 2 + 400;
        this.imgY = height / 2;
        this.imgW = 400;
        this.imgH = 400;

        this.generatedImageLoaded = false; // 이미지 로드 여부

        if (num === 1) {
            this.initialValues = "네가 생성할 이미지는 에드바르 뭉크 스타일의 회화 작품이야.";
        } else if (num === 2) {
            this.initialValues = "네가 생성할 이미지는 모네 스타일의 인상주의 회화 작품이야.";
        } else if (num === 3) {
            this.initialValues = "네가 생성할 이미지는 고흐 스타일의 회화 작품이야.";
        }
        console.log("Initial values set:", this.initialValues);
    }

    setup(selectedImage) {
        this.selectedImage = selectedImage;
        background(255,255,255)
       //background(255, 194, 180, 128);
        imageMode(CORNER)
        tint(255, 81.6); // Fimg4의 투명도 적용
        image(Fimg4, 0, 0, width, height);
        tint(255,255,255)
        // section2 로고
        this.section2Draw()

        imageMode(CENTER)
        
        tint(255, 255, 255, 255); // 투명도 100% 설정
        imageMode(CENTER);
        textSize(24)
        text('모든 설명을 입력하지 않아도 괜찮아요. \n 설명은 문장형으로 입력해주세요.', width/2 ,100)
        text('버튼을 클릭한 후에는 잠시 기다려주세요. \n 그림이 생성될 때까지는 약 10초 소요됩니다.',width/2,height-100)

        const numInputs = 3;
        const labelsText = [
            "그림에선 어떤 풍경이나 사물이 보이나요? <br> (날씨와 계절은 어떤지, 사물과 사람의 특징을 알려주세요)",
            "그림에서 어떤 분위기가 느껴지나요? <br> (그림을 보았을 때 받은 인상을 알려주세요)",
            "시각장애인의 이해를 도울 수 있는 부연설명이 있을까요? <br> (그림을 보고 떠올린 개인적인 추억이나 경험도 좋고, 색과 관련된 사물을 예로 들어보는 것도 좋을 거예요.)"
        ];

        for (let i = 0; i < numInputs; i++) {
            const label = createDiv(labelsText[i]);
            label.position(windowWidth / 2 + 150, 180 + i * 200);
            label.class('box-style');
            this.bubble.resize(570, 250);
            image(this.bubble, windowWidth / 2 + 350, 188 + i * 200);
            this.labels.push(label);

            const inputBox = createInput();
            inputBox.position(windowWidth / 2 + 150, 250 + i * 200);
            inputBox.class('box-style');
            inputBox.size(500);
            inputBox.input(() => this.updateButtonState()); // 입력 이벤트 추가

            this.inputAllBoxes.push(inputBox);

            if (i < 2) {
              this.inputBoxes.push(inputBox);
          }
        }

        // Generate Image 버튼
        this.generateButton = createButton('내 설명으로 만든<br>작품 보기');
        this.generateButton.position(windowWidth * 8 / 10 + 50, windowHeight * 8 / 9 - 20);
        this.generateButton.class('box-style')

        // 버튼 모양 초기 상태 - 비활성화
        this.generateButton.attribute('disabled', 'true'); // 'true'로 설정
        this.generateButton.style('background-color', 'lightgray'); // 비활성화 배경색
        this.generateButton.style('cursor', 'not-allowed'); // 비활성화 커서
        this.generateButton.style('border', '2px solid black'); // 테두리 설정
        this.generateButton.style('border-radius', '50px'); // 모서리 둥글게
        this.generateButton.style('padding', '10px 20px'); // 버튼 크기 조정
        this.generateButton.mousePressed(() => this.generateImage());

        image(this.selectedImage, 400, height / 2, 400, 400);

        
    }

    updateButtonState() {
      // 입력 필드 중 하나라도 값이 있으면 버튼 활성화
      const hasInput = this.inputBoxes.some((box) => box.value().trim() !== '');
      if (hasInput) {
          this.generateButton.removeAttribute('disabled'); // 버튼 활성화
          this.generateButton.style('background-color', 'white'); // 활성화 배경색
          this.generateButton.style('cursor', 'pointer'); // 활성화 커서
      } else {
          this.generateButton.attribute('disabled', ''); // 버튼 비활성화
          this.generateButton.style('background-color', 'lightgray'); // 비활성화 배경색
          this.generateButton.style('cursor', 'not-allowed'); // 비활성화 커서
      }
  }

    async generateImage() {
        this.generateButton.attribute('disabled', 'true');
        this.generateButton.html('작품을 생성중입니다...');

        const userInputs = this.inputBoxes.map(box => box.value()).join(' ');
        const combinedPrompt = `${this.initialValues} ${userInputs}`;

        const userAllInputs = this.inputAllBoxes.map(box => box.value()).join(' ');
        user_prompt = userAllInputs;

        try {
            const response = await fetch('http://localhost:3000/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: combinedPrompt }),
            });

            const data = await response.json();
            if (data.imageUrl) {
                console.log('Received Image URL:', data.imageUrl);

                const proxiedUrl = `http://localhost:3000/proxy-image?url=${encodeURIComponent(data.imageUrl)}`;
                
               
                loadImage(proxiedUrl, (img) => {
                    imageMode(CENTER)
                    image(img, this.imgX, this.imgY, this.imgW, this.imgH);
                    this.generatedImageLoaded = true; // 이미지 로드 완료
                    image(picframe,this.imgX, this.imgY, this.imgW, this.imgH)


                });

                imageUrl = proxiedUrl;
                this.hideInputsAndButton();
                fill(255,111,111)
                rectMode(CENTER) // 로딩 화면
                rect(this.imgX, this.imgY, this.imgW, this.imgH)
                image(picframe,this.imgX, this.imgY, this.imgW, this.imgH)
                fill(0)
                rectMode(CORNER)

                // Supabase에 저장
                const saveSuccess = await uploadImageToSupabase(imageUrl, num, user_prompt);
                if (!saveSuccess) {
                    console.error('Failed to save image URL to Supabase');
                }
        
            } else {
                console.error('Image generation failed:', data.error);
            }
        } catch (error) {
            console.error('Error while generating image:', error);
        } finally {
            this.generateButton.html('Generate Image');
            this.generateButton.removeAttribute('disabled');
        }
    }

    hideInputsAndButton() {
        this.inputAllBoxes.forEach(inputBox => inputBox.hide());
        this.labels.forEach(label => label.hide());
        this.generateButton.hide();
        background(255);
        background(255, 194, 180, 128);  // 배경색 설정
        imageMode(CORNER)
        tint(255, 81.6); // Fimg4의 투명도 적용
        image(Fimg4, 0, 0, width, height);
        tint(255,255,255)
        this.section2Draw()
        imageMode(CENTER);
        tint(255, 255, 255, 255);
        image(this.selectedImage, 400, height / 2, 400, 400);
        textSize(24)
        text('생성된 작품을 원본과 천천히 비교해보신 후, 그림을 클릭하시면 다음 화면으로 전환됩니다.',width/2,height-150)
    }

    section2Draw(){
        imageMode(CORNER)
        let scaleFactor1 = min(windowWidth, windowHeight) * 0.15 / max(section2.width, section2.height);
        let newWidth1 = section2.width * scaleFactor1;
        let newHeight1 = section2.height * scaleFactor1;
        image(section2, windowWidth / 80, windowHeight / 80, newWidth1, newHeight1);
        imageMode(CENTER)
    }
    

    handleImageClick() {
        if (
            this.generatedImageLoaded &&
            mouseX > this.imgX - this.imgW / 2 &&
            mouseX < this.imgX + this.imgW / 2 &&
            mouseY > this.imgY - this.imgH / 2 &&
            mouseY < this.imgY + this.imgH / 2
        ) {
            yun_case += 1;
            console.log('Generated image clicked! yun_case:', yun_case);
            return
        }
    }
}

//supabase에 데이터 업로드하는 함수
async function uploadImageToSupabase(imageUrl, num, prompt) {
    try {
        // Fetch the image from the URL
        const response = await fetch(imageUrl);
        if (!response.ok) {
        throw new Error('Failed to fetch image from the provided URL');
        }
        const imageBlob = await response.blob();
        const FileName = `t${Date.now()}.jpg`; // 고유 파일 이름 생성


        // Supabase storage 이미지 업로드
        const { data, error } = await supabase.storage
        .from('test')
        .upload(`public/${FileName}`, imageBlob, {
            contentType: 'image/jpg',
            upsert: false, 
            cacheControl: '3600',
        });

        if (error) {
        throw error;
        }

        console.log('Image uploaded successfully:', data);
        
        // Supabase database 이미지 메타데이터 저장
        const { data: metadataData, error: metadataError } = await supabase
        .from('image_metadata')
        .insert([
            {
                file_path: data.path, // 저장된 파일 경로
                num: num, //num 값
                prompt: prompt, //prompt 값
            },
        ]);

        if (metadataError) {
            throw metadataError;
        }

        console.log('Metadata saved successfully:', metadataData);
        return true;

    } catch (error) {
      console.error('Error uploading image to Supabase:', error);
      throw error;
    }
  }

//supabase에서 데이터 불러오는 함수
async function fetchImagesFromSupabase(num) {
    try {
        // Supabase에서 num 값이 같은 데이터 가져오기
        const { data, error } = await supabase
            .from('image_metadata')
            .select('*')
            .eq('num', num);

        if (error) {
            throw error;
        }

        console.log('Fetched images and prompts:', data);
        return data; // 이미지와 프롬프트 배열 반환
    } catch (error) {
        console.error('Error fetching images from Supabase:', error);
        return [];
    }
}

class Case2Viewer {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
    }

    async setup(num) {
        this.images = await fetchImagesFromSupabase(num);
        this.currentIndex = 0;
        this.displayCurrentImage();
    }

    displayCurrentImage() {
        // 그림과 프롬프트 영역 초기화
        this.clearContentArea();
        imageMode(CENTER);

        if (this.images.length > 0) {
            const currentImage = this.images[this.currentIndex];
            const imagePath = `https://fogmydcroufvihnwmvdv.supabase.co/storage/v1/object/public/test/${currentImage.file_path}`;

            loadImage(imagePath, (img) => {
                image(img, width / 2, height / 2, 400, 400); // 현재 이미지 표시
                image(picframe, width / 2, height / 2, 400, 400)
            });

            // 현재 프롬프트 표시
            fill(0);
            textSize(20);
            textAlign(CENTER);
            text(currentImage.prompt, width / 2, height / 2 + 250);
        } else {
            fill(0);
            textSize(20);
            textAlign(CENTER);
            text("No images found for this category.", width / 2, height / 2);
        }
        this.showArrows();
        this.drawArrowButton();
    }

    clearContentArea() {
        // 그림과 프롬프트 영역 초기화
        background(255)
        background(255, 194, 180, 128); // 배경색
        imageMode(CORNER)
        tint(255, 81.6); // Fimg4의 투명도 적용
        image(Fimg4, 0, 0, width, height);
        tint(255,255,255)
        let scaleFactor1 = min(windowWidth, windowHeight) * 0.15 / max(section2.width, section2.height);
        let newWidth1 = section2.width * scaleFactor1;
        let newHeight1 = section2.height * scaleFactor1;
        image(section2, windowWidth / 80, windowHeight / 80, newWidth1, newHeight1);
        imageMode(CENTER)
        noStroke();
        
        fill(255,194,180)
        // 그림 영역 초기화
        rect(width / 2 - 200, height / 2 - 200, 400, 400); 
        // 프롬프트 영역 초기화
        rect(0, height / 2 + 200, width, 100); 
    }

    showArrows() {
        // 왼쪽 화살표
        fill(0);
        triangle(50, height / 2 - 20, 50, height / 2 + 20, 20, height / 2);
        // 오른쪽 화살표
        triangle(width - 50, height / 2 - 20, width - 50, height / 2 + 20, width - 20, height / 2);
    }

    handleArrowClick() {
        if (mouseX < 70 && mouseY > height / 2 - 20 && mouseY < height / 2 + 20) {
            // 왼쪽 화살표 클릭
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.displayCurrentImage();
        } else if (mouseX > width - 70 && mouseY > height / 2 - 20 && mouseY < height / 2 + 20) {
            // 오른쪽 화살표 클릭
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.displayCurrentImage();
        }
    }

    drawArrowButton() {
      let arrowX = width - 150;
      let arrowY = height - 150;
      imageMode(CORNER);
      image(arrowImg, arrowX, arrowY, 100, 100);
      imageMode(CENTER);

      if (mouseX > arrowX && mouseX < arrowX + 100 && mouseY > arrowY && mouseY < arrowY + 100) {
        push();
        stroke(255, 255, 255); // 흰색 외곽선
        strokeWeight(4);
        noFill();
        rect(arrowX, arrowY, 100, 100); // 버튼 외곽선
        pop();
      }
    }
}

// Case 2 클래스 인스턴스
let case2Viewer = null;

  // 지윤 화면 처리 함수들
  function drawFirstScreen() {
    
  // 배경 사각형 (1번 사각형: purrect)
  noStroke();
  fill(79, 37, 137); // 색상 (밝은 보라색 예시)
  rect(0, 0, windowWidth, windowHeight);

  // 하단 사각형 (2번 사각형: pinkrect)
  fill(255, 182, 193); // 색상 (밝은 핑크색 예시)
  rect(0, windowHeight - windowHeight * 0.2, windowWidth, windowHeight * 0.2);

  let FscaleFactor = 0.8; // 이미지 크기 0.8배 축소

  // korstars 이미지 설정
  let korstarsHeight = (windowHeight / 5) * 0.7 * FscaleFactor;
  let korstarsWidth = korstars.width * (korstarsHeight / korstars.height);
  let korstarsX = (windowWidth - korstarsWidth) / 2;
  let korstarsY = Fimg3Y -95  ; // 원하는 위치 설정

  // clouds 이미지 설정
  let cloudsHeight = (windowHeight / 5) * 2* FscaleFactor;
  let cloudsWidth = clouds.width * (cloudsHeight / clouds.height);
  let cloudsX = (windowWidth - cloudsWidth) / 2;
  let cloudsY = Fimg3Y-100; // 원하는 위치 설정

  // 이미지 그리기
  image(korstars, korstarsX, korstarsY, korstarsWidth, korstarsHeight);
  image(clouds, cloudsX, cloudsY, cloudsWidth, cloudsHeight);

    let Fimg3Height = (windowHeight / 5) * 1.5 * FscaleFactor;
    let Fimg3Width = Fimg3.width * (Fimg3Height / Fimg3.height);
    let Fimg3X = (windowWidth - Fimg3Width) / 2;
  
    let Fimg1Height = (windowHeight * 4) / 5 * FscaleFactor;
    let Fimg1Width = Fimg1.width * (Fimg1Height / Fimg1.height);
    Fimg1X = (windowWidth - Fimg1Width) / 2;
    let Fimg1Y = (windowHeight - Fimg1Height) / 2 + windowHeight / 10 + windowHeight / 20;
  
    Fimg2Height = (windowHeight / 5) * 1.5 * FscaleFactor;
    Fimg2Width = Fimg2.width * (Fimg2Height / Fimg2.height);
    Fimg2X = Fimg1X + (Fimg1Width - Fimg2Width) / 2;
    Fimg2Y = Fimg1Y + Fimg1Height - Fimg2Height;
  
    image(Fimg3, Fimg3X, Fimg3Y, Fimg3Width, Fimg3Height);
    image(Fimg1, Fimg1X, Fimg1Y, Fimg1Width, Fimg1Height);
    image(Fimg2, Fimg2X, Fimg2Y, Fimg2Width, Fimg2Height);
  
    // 마우스가 Fimg2 영역에 있을 때 hand cursor로 변경하고 크기 1.5배로 확대
    if (
      mouseX > Fimg2X && mouseX < Fimg2X + Fimg2Width &&
      mouseY > Fimg2Y && mouseY < Fimg2Y + Fimg2Height
    ) {
      cursor('pointer');  // hand cursor로 변경
      // Fimg2 크기 1.5배로 설정
      let FenlargedImg2Width = Fimg2Width * 1.5;
      let FenlargedImg2Height = Fimg2Height * 1.5;
      image(Fimg2, Fimg2X - (FenlargedImg2Width - Fimg2Width) / 2, Fimg2Y - (FenlargedImg2Height - Fimg2Height) / 2, FenlargedImg2Width, FenlargedImg2Height);
    } else {
      cursor('default');  // 기본 커서로 변경
    }
  }
  
  function drawMiddleScreen() {
    let FscaleFactor = 0.8; // 이미지 크기 0.8배 축소
  
  // 배경 사각형 (1번 사각형: purrect)
  noStroke();
  fill(79, 37, 137); // 색상 (밝은 보라색 예시)
  rect(0, 0, windowWidth, windowHeight);

  // 하단 사각형 (2번 사각형: pinkrect)
  fill(255, 182, 193); // 색상 (밝은 핑크색 예시)
  rect(0, windowHeight - windowHeight * 0.2, windowWidth, windowHeight * 0.2);

  // korstars 이미지 설정
  let korstarsHeight = (windowHeight / 5) * 0.7 * FscaleFactor;
  let korstarsWidth = korstars.width * (korstarsHeight / korstars.height);
  let korstarsX = (windowWidth - korstarsWidth) / 2;
  let korstarsY = Fimg3Y-95  ; // 원하는 위치 설정

  // clouds 이미지 설정
  let cloudsHeight = (windowHeight / 5) * 2* FscaleFactor;
  let cloudsWidth = clouds.width * (cloudsHeight / clouds.height);
  let cloudsX = (windowWidth - cloudsWidth) / 2;
  let cloudsY = Fimg3Y-100; // 원하는 위치 설정

    let Fimg3Height = (windowHeight / 5) * 1.5 * FscaleFactor;
    let Fimg3Width = Fimg3.width * (Fimg3Height / Fimg3.height);
    let Fimg3X = (windowWidth - Fimg3Width) / 2;
  
    let Fimg1Height = (windowHeight * 4) / 5 * FscaleFactor;
    let Fimg1Width = Fimg1.width * (Fimg1Height / Fimg1.height);
    let Fimg1Y = (windowHeight - Fimg1Height) / 2 + windowHeight / 10 + windowHeight / 20;
  
    Fimg2Height = (windowHeight / 5) * 1.5 * FscaleFactor;
    Fimg2Width = Fimg2.width * (Fimg2Height / Fimg2.height);
    Fimg2X = Fimg1X + (Fimg1Width - Fimg2Width) / 2;
    Fimg2Y = Fimg1Y + Fimg1Height - Fimg2Height;
  
    // Fimg3를 위로 이동 (y좌표 감소)
    Fimg3Y -= FtransitionSpeed * 0.8;
  
    // Fimg1과 Fimg2의 x좌표를 감소시켜서 오른쪽으로 사라지게 함
    Fimg1X -= FtransitionSpeed * 2;  // Fimg1의 x좌표 감소
    Fimg2X -= FtransitionSpeed * 2;  // Fimg2의 x좌표 감소
  
    // Fimg1과 Fimg2가 화면 밖으로 사라지면 두 번째 화면으로 넘어감
    if (Fimg1X + Fimg1Width < 0 && Fimg2X + Fimg2Width < 0) {
      FmiddleScreen = false;
      FnextScreen = true; // 두 번째 화면으로 전환
      setTimeout(() => {
        Fimg4Alpha = 81.6; // 32% 불투명도로 변경 (255 * 0.32)
        setTimeout(() => {
          FshowImages = true; // 2초 뒤에 FshowImages를 true로 설정
        }, 400); // 2초 후에 FshowImages를 true로 설정
      }, 300); // 0.3초 후에 불투명도 변경
    }

    // 이미지 그리기
  image(korstars, korstarsX, korstarsY, korstarsWidth, korstarsHeight);
  image(clouds, cloudsX, cloudsY, cloudsWidth, cloudsHeight);
  
  
    // 화면에 이미지 그리기
    image(Fimg3, Fimg3X, Fimg3Y, Fimg3Width, Fimg3Height);
    image(Fimg1, Fimg1X, Fimg1Y, Fimg1Width, Fimg1Height);
    image(Fimg2, Fimg2X, Fimg2Y, Fimg2Width, Fimg2Height);
  
  }
  
  function drawSecondScreen() {
    tint(255, Fimg4Alpha); // Fimg4의 투명도 적용
    image(Fimg4, 0, 0, width, height);
    noTint(); // 투명도 설정 초기화
  
    // 텍스트 추가
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Click the Button', width / 2, height / 10);
  
    // 2초 후에 FintroImage와 FButtonImage 표시
    if (FshowImages) {
      // Fintro 이미지 크기 0.8배로 조정
      let FintroWidth = FintroImage.width * 0.8;
      let FintroHeight = FintroImage.height * 0.8;
  
      // FintroImage를 화면 가로 중앙, 세로 1/4 위치에 배치
      let FintroX = (width - FintroWidth) / 2;
      let FintroY = height / 15;
      image(FintroImage, FintroX, FintroY, FintroWidth, FintroHeight);
  
      // Fsection1ButtonImage 크기 조정
      let FsectionButtonWidth = Fsection1ButtonImage.width * 0.5; // 크기 50%로 조정
      let FsectionButtonHeight = Fsection1ButtonImage.height * 0.5;
  
      // Fsection1ButtonImage를 화면 가로 중앙, 세로 7/8 위치에 배치
      let FsectionButtonX = (width - FsectionButtonWidth) / 2; // 가로 중앙 정렬
      let FsectionButtonY = height * 7 / 8 - FsectionButtonHeight / 2; // 세로 7/8 위치에 정렬
      image(Fsection1ButtonImage, FsectionButtonX, FsectionButtonY, FsectionButtonWidth, FsectionButtonHeight);
    }
  }
  
  // 지우 화면 처리 함수들
  function drawIntroScreen() {
    textAlign(CENTER, CENTER); // 텍스트 중앙 정렬
    // 텍스트 크기 설정
    textSize(40);
    // 첫 번째 텍스트
    text("이제 당신은 잠시 시각 장애인의 세상 속으로 들어갑니다.", width / 2, height / 2 - 70);
    // 두 번째 텍스트
    text("그들은 미술관에서 어떤 경험과 마주하게 될까요?", width / 2, height / 2 - 20);
    // 텍스트 크기 변경
    textSize(30);
    // 세 번째 텍스트
    text("화살표를 눌러 시작하세요.", width / 2, height / 2 + 50);}
    
    function drawArtworkSelection() {
      textAlign(CENTER, CENTER);
      textSize(24);
      fill(0);
      text("세 가지 버전의 그림 중 하나를 선택하세요.", width / 2, height * 0.25);
    
      let gap = width * 0.05; // 이미지 간격
      let totalWidth = artworkImages.reduce((acc, img) => acc + img.width, 0) + (artworkImages.length - 1) * gap; // 전체 너비 계산
      let startX = (width - totalWidth) / 2; // 시작 X 좌표 계산
    
      for (let i = 0; i < artworkImages.length; i++) {
        let x = startX + (i === 0 ? 0 : artworkImages.slice(0, i).reduce((acc, img) => acc + img.width, 0) + i * gap);
        let y = height * 0.4;
    
        // 이미지 그리기
        image(artworkImages[i].img, x, y, artworkImages[i].width, artworkImages[i].height);
    
        // 마우스 오버 시 테두리 표시
        if (
          mouseX > x &&
          mouseX < x + artworkImages[i].width &&
          mouseY > y &&
          mouseY < y + artworkImages[i].height
        ) {
          push();
          stroke(204, 153, 255);
          strokeWeight(5);
          noFill();
          rect(x, y, artworkImages[i].width, artworkImages[i].height);
          pop();
        }
      }
    }

    function drawNarrationScreen() {
      if (selectedOption === -1) return;
  
      // vdes 이미지 렌더링
      let scaleFactor9 = min(windowWidth, windowHeight) * 0.7 / max(vdes.width, vdes.height);
      let newWidth9 = vdes.width * scaleFactor9;
      let newHeight9 = vdes.height * scaleFactor9;
      let xPos9 = (windowWidth - newWidth9) / 2; // 가로 가운데 위치
      let yPos9 = windowHeight * 2.4 / 10; // 세로 위치 조정
      image(vdes, xPos9, yPos9, newWidth9, newHeight9);
  
      // vwave 이미지 렌더링
      let scaleFactor10 = min(windowWidth, windowHeight) / max(vwave.width, vwave.height);
      let newWidth10 = vwave.width * scaleFactor10;
      let newHeight10 = vwave.height * scaleFactor10;
      let xPos10 = (windowWidth - newWidth10) / 2; // 가로 중앙
      let yPos10 = (windowHeight - newHeight10) / 2; // 세로 중앙
      image(vwave, xPos10, yPos10, newWidth10, newHeight10);
  
      // 재생 버튼 위치 및 크기 설정
      let replayWidth = 240;
      let replayHeight = 80;
      let replayX = width / 2 - replayWidth / 2;
      let replayY = height / 2 + 250;
  
      // 재생 버튼 이미지 렌더링
      image(replayImg, replayX, replayY, replayWidth, replayHeight);
  
      // 버튼에 마우스가 올라가면 강조 효과
      if (
          mouseX > replayX && mouseX < replayX + replayWidth &&
          mouseY > replayY && mouseY < replayY + replayHeight
      ) {
          push();
          stroke(204, 153, 255);
          strokeWeight(3);
          noFill();
          rect(replayX, replayY, replayWidth, replayHeight);
          pop();
      }
  
      // 나레이션이 종료되었는지 확인
      if (currentSound && !currentSound.isPlaying() && !narrationFinished) {
          narrationFinished = true;
      }
  
      // 나레이션 종료 메시지
      if (narrationFinished) {
          textSize(25);
          textAlign(CENTER);
          text("음성 설명이 끝났습니다. 화살표를 눌러 다음 단계로 넘어가세요.", width / 2, height / 2 + 200);
      }
  
      // 클릭 이벤트 처리
      if (mouseIsPressed) {
          if (
              mouseX > replayX && mouseX < replayX + replayWidth &&
              mouseY > replayY && mouseY < replayY + replayHeight
          ) {
              // 나레이션 재생
              if (!currentSound || !currentSound.isPlaying()) {
                  if (currentSound) currentSound.stop(); // 이전 사운드 정지
                  if (selectedOption >= 0 && selectedOption < narrationSounds.length) {
                      currentSound = narrationSounds[selectedOption];
                      currentSound.play();
                      narrationFinished = false;
                  }
              }
          }
      }
  }
  
  
  function drawQuestionScreen() {textAlign(CENTER, CENTER); // 텍스트 중앙 정렬
    textSize(35); // 텍스트 크기 설정
  
    let lineHeight = 50; // 각 줄 사이의 간격
  
    // 첫 번째 텍스트
    text("색이나 빛, 사물을 한 번도 본 적 없는 선천적 전맹 시각장애인이라면,", width / 2, height / 2 - lineHeight);
  
    // 두 번째 텍스트
    text("어떤 설명이 추가되는 것이 좋을까요? 잠시 그들의 입장에서 상상해주세요.", width / 2, height / 2 + lineHeight);
  }
  
  function drawQuizScreen() {
    let startIndex = selectedOption * 4; // 선택된 옵션에 따른 퀴즈 이미지 인덱스 시작점
  
    // 질문 텍스트
    textAlign(CENTER, CENTER);
    textSize(30);
    text("나레이션이 설명한 작품은 무엇일까요?", width / 2, height * 0.2);
  
    // 이미지 크기와 간격
    let imgWidth = 300;
    let imgHeight = 200;
    let imgSpacing = 50;
  
    // 화면 중앙에 2x2 그리드 형태로 이미지 배치
    let startX = (width - imgWidth * 2 - imgSpacing) / 2;
    let startY = height * 0.3;
  
    for (let i = 0; i < 4; i++) {
      let x = startX + (i % 2) * (imgWidth + imgSpacing); // 가로 위치
      let y = startY + Math.floor(i / 2) * (imgHeight + imgSpacing); // 세로 위치
  
      // 이미지 표시
      image(quizImages[startIndex + i], x, y, imgWidth, imgHeight);
  
      // 마우스가 이미지 위에 있을 때 테두리 표시
      if (
        mouseX > x && mouseX < x + imgWidth &&
        mouseY > y && mouseY < y + imgHeight
      ) {
        push();
        stroke(204, 153, 255);
        strokeWeight(4);
        noFill();
        rect(x, y, imgWidth, imgHeight);
        pop();
      }
    }

  }

  function drawAnswerScreen() {
    let imageWidth = 500;
    let imageHeight = 300;
    let spacing = 50; // 그림 간격

    let imageXCorrect = (width - imageWidth * 2 - spacing) / 2; // 정답 그림의 x 좌표
    let imageXSelected = imageXCorrect + imageWidth + spacing; // 선택한 그림의 x 좌표
    let imageY = height * 0.25; // 두 그림의 y 좌표

    // 정답 여부 확인
    let isCorrect = selectedQuizOption === selectedOption;

    if (isCorrect) {
        // 정답 화면 렌더링
        image(actualArtworks[selectedOption], (width - imageWidth) / 2, imageY, imageWidth, imageHeight);

        // 정답 메시지 및 작품 정보 출력
        let artist, title;
        if (selectedOption === 0) {
            artist = "Claude Monet";
            title = "The Flood";
        } else if (selectedOption === 1) {
            artist = "Edward Hopper";
            title = "Nighthawks";
        } else if (selectedOption === 2) {
            artist = "Marc Chagall";
            title = "Above the Head";
        }

        if (artist && title) {
            textAlign(CENTER, CENTER);
            textSize(30);
            fill(0);
            stroke(204, 153, 255);
            strokeWeight(2);
            text(`${artist}, <${title}>`, width / 2, imageY + imageHeight + 40);
        }

        textSize(30);
        textAlign(CENTER, CENTER);
        text("정답입니다! 나레이션이 설명한 작품과 일치합니다.", width / 2, imageY + imageHeight + 80);
        text("이 작품은 시각장애인 전시를 경험하며 상상한 그림입니다.", width / 2, imageY + imageHeight + 120);
    } else {
        // 정답 그림 렌더링 (왼쪽)
        image(actualArtworks[selectedOption], imageXCorrect, imageY, imageWidth, imageHeight);

        // 선택한 그림 렌더링 (오른쪽)
        image(quizImages[selectedOption * 4 + selectedQuizOption], imageXSelected, imageY, imageWidth, imageHeight);

        // 오답 메시지 출력
        textSize(30);
        textAlign(CENTER, CENTER);
        text("오답입니다. 선택한 작품은 나레이션이 설명한 작품이 아닙니다.", width / 2, imageY + imageHeight + 80);
        text("다시 상상해보며 작품을 맞춰보세요.", width / 2, imageY + imageHeight + 120);

        // 선택한 오답에 따라 다른 메시지 추가 (옵션)
        let incorrectMessage;
        if (selectedQuizOption === 1) {
            incorrectMessage = "이 그림은 Edward Hopper의 작품입니다.";
        } else if (selectedQuizOption === 2) {
            incorrectMessage = "이 그림은 Marc Chagall의 작품입니다.";
        } else {
            incorrectMessage = "다른 작가의 작품입니다.";
        }
        text(incorrectMessage, width / 2, imageY + imageHeight + 160);
    }
}

  
  function drawFinalScreen() {
    textAlign(CENTER, CENTER); // 텍스트 중앙 정렬
  
    // 화면 상단 텍스트
    textSize(40); // 텍스트 크기 크게 설정
    text("이제 함께 미술관을 관람해보시겠습니까?", width / 2, height * 0.25);
  
    // 버튼 공통 크기와 위치
    let buttonWidth = 150; // 버튼 너비
    let buttonHeight = 70; // 버튼 높이
    let buttonY = height * 0.4; // 버튼 Y 위치
    let textYOffset = buttonHeight + 20; // 텍스트와 버튼 간 간격
    let buttonGap = 180; // 버튼 간격 증가
  
    // "처음으로" 버튼
    let resetButtonX = width / 2 - buttonWidth - buttonGap / 2; // X 위치 (왼쪽으로 이동)
    image(resetImg, resetButtonX, buttonY, buttonWidth, buttonHeight);
  
    // "처음으로" 버튼 강조 효과
    if (isMouseOver(resetButtonX, buttonY, buttonWidth, buttonHeight)) {
      push();
      stroke(255); // 흰색 강조
      strokeWeight(3);
      noFill();
      rect(resetButtonX, buttonY, buttonWidth, buttonHeight);
      pop();
    }
  
    // "처음으로" 버튼 텍스트
    textSize(30);
    text("다시 1전시관으로", resetButtonX + buttonWidth / 2, buttonY + textYOffset);
  
    // "다음 전시로" 버튼
    let nextButtonX = width / 2 + buttonGap / 2; // X 위치 (오른쪽으로 이동)
    image(nextImg, nextButtonX, buttonY, buttonWidth, buttonHeight);
  
    // "다음 전시로" 버튼 강조 효과
    if (isMouseOver(nextButtonX, buttonY, buttonWidth, buttonHeight)) {
      push();
      stroke(255); // 흰색 강조
      strokeWeight(3);
      noFill();
      rect(nextButtonX, buttonY, buttonWidth, buttonHeight);
      pop();
    }
  
    // "다음 전시로" 버튼 텍스트
    textSize(30);
    text("다음 전시로", nextButtonX + buttonWidth / 2, buttonY + textYOffset);
  }
  // 마우스 위치 확인 함수
  function isMouseOver(x, y, w, h) {
    return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  }
  
  function drawSecondExhibitionScreen() {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(0); // 검은색 텍스트
    text("두 번째 전시관에 오신 것을 환영합니다!", width / 2, height / 2 - 100);
    textSize(30);
    text("이곳에서 새로운 예술 작품을 감상하세요.", width / 2, height / 2 - 50);
  }
  
  
  // 기타 유틸리티 함수들
  function drawArrowButton() {// 화살표 버튼 숨김
    if (stage === 5 || stage === 8 || stage === 10) return;
  
    let arrowX = width - 150;
    let arrowY = height - 150;
    image(arrowImg, arrowX, arrowY, 100, 100);
    
    if (mouseX > arrowX && mouseX < arrowX + 100 && mouseY > arrowY && mouseY < arrowY + 100) {
      push();
      stroke(255, 255, 255); // 흰색 외곽선
      strokeWeight(4);
      noFill();
      rect(arrowX, arrowY, 100, 100); // 버튼 외곽선
      pop();
    }
    image(arrowImg, arrowX, arrowY, 100, 100);
  }
  
  function drawResetButton() {
    let resetX = width - resetImgWidth - 20; // 버튼 X 위치
    let resetY = 20; // 버튼 Y 위치 (이미지 위치와 일치시킴)
  
    // reset 버튼 이미지 표시
    image(resetImg, resetX, resetY, resetImgWidth, resetImgHeight);
  
    // 마우스가 버튼 위에 있을 때 강조 효과
    if (
      mouseX > resetX && mouseX < resetX + resetImgWidth &&
      mouseY > resetY && mouseY < resetY + resetImgHeight
    ) {
      push();
      stroke(255, 255, 255); // 흰색 외곽선
      strokeWeight(4);
      noFill();
      rect(resetX, resetY, resetImgWidth, resetImgHeight); // 버튼 외곽선
      pop();
    }
  }
  
  function nextStage() {
    if (currentSound && currentSound.isPlaying()) {
      currentSound.stop(); // 나레이션 멈춤
    }
    currentSound = null; // 나레이션 상태 초기화
    stage++;
  }
  
  function resetState() {
    selectedOption = -1; // 선택 옵션 초기화
    narrationFinished = false; // 나레이션 상태 초기화
    if (currentSound && currentSound.isPlaying()) {
      currentSound.stop(); // 재생 중인 사운드 중지
    }
    currentSound = null; // 사운드 초기화
  
    // 지윤 화면 상태 초기화
    FnextScreen = false;
    FmiddleScreen = false;
    FnextScreen2 = false;
    FshowImages = false;
  
    // Fimg1, Fimg2, Fimg3 위치 초기화
    Fimg3Y = windowHeight / 5.9;
    Fimg1X = (windowWidth - Fimg1.width) / 2;
    Fimg1Y = (windowHeight - Fimg1.height) / 2 + windowHeight / 10 + windowHeight / 20;
  
    // stage 초기화
    stage = 0; // 초기 단계로 설정
  }
  
  function drawSection1Button() {
    // 요청한 크기대로 버튼 크기 설정
    let scaleFactor1 = min(windowWidth, windowHeight) * 0.15 / max(section1Img.width, section1Img.height);
    let buttonWidth = section1Img.width * scaleFactor1; // 버튼 너비
    let buttonHeight = section1Img.height * scaleFactor1; // 버튼 높이
    let marginX = windowWidth / 80; // 좌측 상단 여백 (가로)
    let marginY = windowHeight / 80; // 좌측 상단 여백 (세로)
  
    // 좌측 상단에 버튼 표시
    image(section1Img, marginX, marginY, buttonWidth, buttonHeight);
}

  
  // 나레이션 다시 재생 함수
  function replayNarration() {
    if (currentSound) {
      currentSound.stop(); // 기존 사운드 멈춤
    }
    currentSound = narrationSounds[selectedOption]; // 선택된 옵션의 나레이션 재설정
    currentSound.play(); // 나레이션 재생
    narrationFinished = false; // 나레이션 종료 상태 초기화
  }
  
  function isMouseOver(x, y, w, h) {
    return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  }
  
  function mousePressed() {
    if (stage == 11 && yun_case === 1 && !app) {
        // 이미지 선택 화면에서 클릭 처리
        if (dist(mouseX, mouseY, width / 4, height / 2) < 150) {
            l_selectedImage = l_Image1; // 첫 번째 이미지 선택
            num = 1;
            console.log('num = ', num);
        } else if (dist(mouseX, mouseY, width / 2, height / 2) < 150) {
            l_selectedImage = l_Image2; // 두 번째 이미지 선택
            num = 2;
            console.log('num = ', num);
        } else if (dist(mouseX, mouseY, (3 * width) / 4, height / 2) < 150) {
            l_selectedImage = l_Image3; // 세 번째 이미지 선택
            num = 3;
            console.log('num = ', num);
        }

        if (l_selectedImage && !app) {
            app = new ImageGeneratorApp();
            app.setup(l_selectedImage);
            console.log(imageUrl);
        }

    } else if (stage == 11 &&  yun_case === 1 && app) {
        // 이미지 생성 후 클릭 이벤트 처리
        app.handleImageClick();

    } else if (stage == 11 &&  yun_case === 2 && case2Viewer) {
        case2Viewer.handleArrowClick();
        if (mouseX > width - 150 && mouseX < width - 50 && mouseY > height - 150 && mouseY < height - 50) {
          console.log("Arrow button clicked. Moving to next stage.");
          stage = 12;
        }

    } else if (stage == 12) {
      // more 이미지를 클릭하면 메인 화면으로 돌아가기
      let scaleFactorMore = min(windowWidth, windowHeight) * 0.15 / max(more.width, more.height);
      let newWidthMore = more.width * scaleFactorMore;
      let newHeightMore = more.height * scaleFactorMore;
      let xPosMore = windowWidth / 80;
      let yPosMore = windowHeight / 80;
      if (mouseX > xPosMore && mouseX < xPosMore + newWidthMore && mouseY > yPosMore && mouseY < yPosMore + newHeightMore) {
        isInfo1 = false;  // 메인 화면으로 돌아가기
      }

      // previous2 이미지를 클릭하면 메인 화면으로 돌아가기
      let scaleFactor5 = min(windowWidth, windowHeight) * 0.13 / max(previous2.width, previous2.height);
      let newWidth5 = previous2.width * scaleFactor5;
      let newHeight5 = previous2.height * scaleFactor5;
      let xPos5 = windowWidth / 20;
      let yPos5 = windowHeight * 8.5 / 10;
      if (mouseX > xPos5 && mouseX < xPos5 + newWidth5 && mouseY > yPos5 && mouseY < yPos5 + newHeight5) {
        isInfo1 = false;  // 메인 화면으로 돌아가기
      }

      // link 이미지 클릭 영역
      let scaleFactorLink = min(windowWidth, windowHeight) * 0.4 / max(link.width, link.height);
      let newWidthLink = link.width * scaleFactorLink;
      let newHeightLink = link.height * scaleFactorLink;
      let xPosLink = windowWidth - newWidthLink - 20;
      let yPosLink = windowHeight - newHeightLink - 20;
      if (mouseX > xPosLink && mouseX < xPosLink + newWidthLink && mouseY > yPosLink && mouseY < yPosLink + newHeightLink) {
        window.open('http://www.kbuwel.or.kr/Blind/What', '_blank');  // URL 열기
      }

      // eye 이미지 클릭 영역
      let scaleFactor6 = min(windowWidth, windowHeight) * 0.4 / max(eye.width, eye.height);
      let newWidth6 = eye.width * scaleFactor6;
      let newHeight6 = eye.height * scaleFactor6;
      let xPos6 = windowWidth / 2 - (newWidth6 + 50);
      let yPos6 = windowHeight * 3 / 4;
      if (mouseX > xPos6 && mouseX < xPos6 + newWidth6 && mouseY > yPos6 && mouseY < yPos6 + newHeight6) {
        isInfo1 = true;  // info1 화면으로 전환
      }

      // pro 이미지 클릭 영역
      let scaleFactor7 = min(windowWidth, windowHeight) * 0.4 / max(pro.width, pro.height);
      let newWidth7 = pro.width * scaleFactor7;
      let newHeight7 = pro.height * scaleFactor7;
      let xPos7 = windowWidth / 2 + 50;
      let yPos7 = windowHeight * 3 / 4;
      if (mouseX > xPos7 && mouseX < xPos7 + newWidth7 && mouseY > yPos7 && mouseY < yPos7 + newHeight7) {
        // no action needed since info2 screen is removed
      }
    }

    if (
      stage !== 5 && stage !== 8 && stage !== 10 && // stage 5, 8, 10에서는 클릭 무효화
      stage < 4 &&
      mouseX > width - 150 && mouseX < width - 50 &&
      mouseY > height - 150 && mouseY < height - 50
    ) {
      if (currentSound && currentSound.isPlaying()) {
        currentSound.stop(); // 사운드 멈춤
      }
      currentSound = null; // 사운드 상태 초기화
      stage++; // 다음 단계로 이동
      return;
    }
  
    // 추가적으로 stage 변환마다 currentSound 초기화
    if (currentSound && currentSound.isPlaying()) {
      currentSound.stop();
      currentSound = null;
    }
  
    // 지윤 화면 클릭 처리
    if (stage < 4) {
      if (!FnextScreen && !FmiddleScreen) {
        // Fimg2 클릭 처리
        if (
          mouseX > Fimg2X && mouseX < Fimg2X + Fimg2Width &&
          mouseY > Fimg2Y && mouseY < Fimg2Y + Fimg2Height
        ) {
          console.log("Fimg2 clicked. Transitioning to Middle Screen.");
          FmiddleScreen = true; // 중간 화면으로 전환
          return;
        }
      } else if (FnextScreen && !FnextScreen2) {
        // 섹션1 버튼 클릭 처리
        let FsectionButtonWidth = Fsection1ButtonImage.width * 0.5;
        let FsectionButtonHeight = Fsection1ButtonImage.height * 0.5;
        let FsectionButtonX = (width - FsectionButtonWidth) / 2;
        let FsectionButtonY = height * 6.8 / 8;
  
        if (
          mouseX > FsectionButtonX &&
          mouseX < FsectionButtonX + FsectionButtonWidth &&
          mouseY > FsectionButtonY &&
          mouseY < FsectionButtonY + FsectionButtonHeight
        ) {
          console.log("Section1 Button clicked. Transitioning to Stage 4.");
          FnextScreen2 = true;
          stage = 4; // 다음 화면으로 이동
          return;
        }
      }
    }
  
    // 지우 화면 클릭 처리
    if (stage >= 4 && stage < 11) {
      if (mouseX > width - 150 && mouseX < width - 50 && mouseY > height - 150 && mouseY < height - 50) {
        console.log("Arrow button clicked. Moving to next stage.");
        stage++;
        return;
      }
  
      if (stage === 10) {
        let buttonWidth = 150;
        let buttonHeight = 70;
        let resetButtonX = width / 2 - buttonWidth - 90;
        let resetButtonY = height * 0.4;
        let nextButtonX = width / 2 + 90;
  
        // '처음으로 돌아가기' 버튼 클릭 처리
        if (
          mouseX > resetButtonX &&
          mouseX < resetButtonX + buttonWidth &&
          mouseY > resetButtonY &&
          mouseY < resetButtonY + buttonHeight
        ) {
          console.log("Reset button clicked. Restarting.");
          resetState(); // 상태 초기화
          stage = 4; // 초기 화면으로 이동
          return;
        }
  
        // '다음 전시로' 버튼 클릭 처리
        if (
          mouseX > nextButtonX &&
          mouseX < nextButtonX + buttonWidth &&
          mouseY > resetButtonY &&
          mouseY < resetButtonY + buttonHeight
        ) {
          console.log("Next exhibition button clicked. Moving to Stage 11.");
          stage = 11; // 두 번째 전시관으로 이동
          return;
        }
      }
    }
  
    // Stage : 옵션 선택
    // Stage 5: 옵션 선택
    if (stage === 5) {
      let gap = width * 0.05;
      let totalWidth = artworkImages.reduce((acc, img) => acc + img.width, 0) + (artworkImages.length - 1) * gap;
      let startX = (width - totalWidth) / 2;
  
      for (let i = 0; i < artworkImages.length; i++) {
        let x = startX + (i === 0 ? 0 : artworkImages.slice(0, i).reduce((acc, img) => acc + img.width, 0) + i * gap);
        let y = height * 0.4;
  
        if (
          mouseX > x &&
          mouseX < x + artworkImages[i].width &&
          mouseY > y &&
          mouseY < y + artworkImages[i].height
        ) {
          selectedOption = i; // 선택한 옵션 저장
          console.log(`Option selected: ${selectedOption}`);
          stage = 6; // 다음 스테이지로 이동
          return;
        }
      }
    }
  
    // Stage : 나레이션 재생 버튼 클릭
    if (stage === 6) {
      let replayWidth = 240; // 가로 크기
      let replayHeight = 80; // 세로 크기
      let replayX = width / 2 - replayWidth / 2; // 버튼 중앙 정렬 X 위치
      let replayY = height / 2 + 250; // 버튼 Y 위치
  
      if (
        mouseX > replayX && mouseX < replayX + replayWidth &&
        mouseY > replayY && mouseY < replayY + replayHeight
      ) {
        replayNarration(); // 나레이션 재생
        return;
      }
    }
  
    // Stage : 퀴즈 이미지 선택
    if (stage === 8) {
      let startIndex = selectedOption * 4; // 현재 옵션에 따른 퀴즈 시작점
      let imgWidth = 300;
      let imgHeight = 200;
      let imgSpacing = 50;
      let startX = (width - imgWidth * 2 - imgSpacing) / 2; // 시작점 계산
      let startY = height * 0.3;
  
      for (let i = 0; i < 4; i++) {
        let x = startX + (i % 2) * (imgWidth + imgSpacing);
        let y = startY + Math.floor(i / 2) * (imgHeight + imgSpacing);
  
        if (
          mouseX > x && mouseX < x + imgWidth &&
          mouseY > y && mouseY < y + imgHeight
        ) {
          selectedQuizOption = i; // 클릭한 퀴즈 이미지 저장
          stage = 9; // 다음 단계로 이동
          return;
        }
      }
    }
  
    let resetX = width - resetImgWidth - 20;
    let resetY = 20; // reset 버튼의 Y 위치
    if (
    mouseX > resetX &&
    mouseX < resetX + resetImgWidth &&
    mouseY > resetY &&
    mouseY < resetY + resetImgHeight
  ) {
    stage = 0; // 초기 화면으로 이동
    resetState(); // 초기 상태로 리셋
    return;
  }
  }

  //마무리 화면
  function drawLastScreen() {
    imageMode(CORNER);
    background(255, 194, 180);  // 배경색 설정
  
    // more 버튼
    let scaleFactor1 = min(windowWidth, windowHeight) * 0.15 / max(more.width, more.height);
    let newWidth1 = more.width * scaleFactor1;
    let newHeight1 = more.height * scaleFactor1;
    image(more, windowWidth / 80, windowHeight / 80, newWidth1, newHeight1);
  
    // reset2
    let scaleFactor2 = min(windowWidth, windowHeight) * 0.15 / max(reset2.width, reset2.height);
    let newWidth2 = reset2.width * scaleFactor2;
    let newHeight2 = reset2.height * scaleFactor2;
    image(reset2, windowWidth * 9 / 10, windowHeight / 200, newWidth2, newHeight2);
  
    // framebox
    let scaleFactor3 = min(windowWidth, windowHeight) * 1.1 / max(framebox.width, framebox.height);
    let newWidth3 = framebox.width * scaleFactor3;
    let newHeight3 = framebox.height * scaleFactor3;
    let xPos3 = windowWidth / 2 - newWidth3 / 2;
    let yPos3 = windowHeight / 7;
    image(framebox, xPos3, yPos3, newWidth3, newHeight3);
  
    // eye (크기를 2배로 키우고, 세로 3/4 위치에 배치, 가운데 기준으로 왼쪽에 배치)
    let scaleFactor6 = min(windowWidth, windowHeight) * 0.4 / max(eye.width, eye.height);  // 기존 크기보다 두 배로 키움
    let newWidth6 = eye.width * scaleFactor6;
    let newHeight6 = eye.height * scaleFactor6;
    let xPos6 = windowWidth / 2 - (newWidth6 + 50);  // 간격을 50px로 넓힘
    let yPos6 = windowHeight * 3 / 4;  // 세로 3/4 위치에 배치
    image(eye, xPos6, yPos6, newWidth6, newHeight6);
  }
  
  // info1 화면 그리기
  function drawInfo1Screen() {
    background(255, 194, 180);  // info1 화면 배경을 설정
  
    // previous2
    let scaleFactor5 = min(windowWidth, windowHeight) * 0.13 / max(previous2.width, previous2.height);
    let newWidth5 = previous2.width * scaleFactor5;
    let newHeight5 = previous2.height * scaleFactor5;
    let xPos5 = windowWidth / 20;
    let yPos5 = windowHeight * 8.5 / 10;
  
    // 마우스가 previous2 위에 있을 경우 테두리 파란색
    if (isHoveringPrevious2) {
      stroke(255);  // 파란색 테두리
      strokeWeight(3);
      noFill();
      rect(xPos5, yPos5, newWidth5, newHeight5);  // 테두리 그리기
    }
    noStroke();  // 테두리 초기화
    image(previous2, xPos5, yPos5, newWidth5, newHeight5);
  
    // link 이미지 추가 (우하단에 배치, 마우스 호버 시 테두리 추가)
    let scaleFactorLink = min(windowWidth, windowHeight) * 0.4 / max(link.width, link.height);  // 적당한 크기로 조정
    let newWidthLink = link.width * scaleFactorLink;
    let newHeightLink = link.height * scaleFactorLink;
    let xPosLink = windowWidth - newWidthLink - 20;  // 우하단에 20px 여유를 두고 배치
    let yPosLink = windowHeight - newHeightLink - 20;  // 우하단에 20px 여유를 두고 배치
  
    // 마우스가 link 위에 있을 경우 테두리 파란색
    if (isHoveringLink) {
      stroke(255);  // 파란색 테두리
      strokeWeight(3);
      noFill();
      rect(xPosLink, yPosLink, newWidthLink, newHeightLink);  // 테두리 그리기
    }
    noStroke();  // 테두리 초기화
    image(link, xPosLink, yPosLink, newWidthLink, newHeightLink);
  
    // 기존 이미지들
    let scaleFactor1 = min(windowWidth, windowHeight) * 0.15 / max(more.width, more.height);
    let newWidth1 = more.width * scaleFactor1;
    let newHeight1 = more.height * scaleFactor1;
    image(more, windowWidth / 80, windowHeight / 80, newWidth1, newHeight1);
  
    let scaleFactor2 = min(windowWidth, windowHeight) * 0.15 / max(reset2.width, reset2.height);
    let newWidth2 = reset2.width * scaleFactor2;
    let newHeight2 = reset2.height * scaleFactor2;
    image(reset2, windowWidth * 9 / 10, windowHeight / 200, newWidth2, newHeight2);
  
    // 새로운 이미지들 추가 (category와 definition 이미지를 오른쪽으로 이동)
    let scaleFactorNew1 = min(windowWidth, windowHeight) * 1.5 / max(newImage1.width, newImage1.height);
    let newWidthNew1 = newImage1.width * scaleFactorNew1;
    let newHeightNew1 = newImage1.height * scaleFactorNew1;
    image(newImage1, windowWidth / 7.5, windowHeight * 0.4 / 15, newWidthNew1, newHeightNew1);  // xPos를 windowWidth / 3으로 변경
  
    let scaleFactorNew2 = min(windowWidth, windowHeight) * 1.5 / max(newImage2.width, newImage2.height);
    let newWidthNew2 = newImage2.width * scaleFactorNew2;
    let newHeightNew2 = newImage2.height * scaleFactorNew2;
    image(newImage2, windowWidth / 7.5, windowHeight * 4.2 / 15, newWidthNew2, newHeightNew2);  // xPos를 windowWidth / 3으로 변경
  }

  // 마우스 이동 이벤트 처리
function mouseMoved() {
  let scaleFactor5 = min(windowWidth, windowHeight) * 0.13 / max(previous2.width, previous2.height);
  let newWidth5 = previous2.width * scaleFactor5;
  let newHeight5 = previous2.height * scaleFactor5;
  let xPos5 = windowWidth / 20;
  let yPos5 = windowHeight * 8.5 / 10;

  // 마우스가 previous2 이미지 위에 있는지 확인
  isHoveringPrevious2 =
    mouseX > xPos5 && mouseX < xPos5 + newWidth5 && mouseY > yPos5 && mouseY < yPos5 + newHeight5;

  // link 이미지 위에 있는지 확인
  let scaleFactorLink = min(windowWidth, windowHeight) * 0.4 / max(link.width, link.height);
  let newWidthLink = link.width * scaleFactorLink;
  let newHeightLink = link.height * scaleFactorLink;
  let xPosLink = windowWidth - newWidthLink - 20;
  let yPosLink = windowHeight - newHeightLink - 20;

  isHoveringLink =
    mouseX > xPosLink && mouseX < xPosLink + newWidthLink && mouseY > yPosLink && mouseY < yPosLink + newHeightLink;
}