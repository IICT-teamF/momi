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
let section2, reset2, framebox, next2, previous2, gbox, bbox, pbox, picframe, chatting2, promp2;  // 이미지를 저장할 변수 선언

// Proxy URL 선언
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // 공개 프록시 URL

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);  // 캔버스 크기 변경
  }

function preload() {
    // 이미지 로드
    l_Image1 = loadImage('asset/painting1.jpeg');
    l_Image2 = loadImage('asset/painting2.png');
    l_Image3 = loadImage('asset/painting3.png');
    l_bubble = loadImage('asset/bubble.png');
    project_font = loadFont('asset/nanumGalmae.ttf');

    //지윤님 이미지 로드
    section2 = loadImage('section2/section2.svg');  // 첫 번째 이미지 로드 (2전시관 로고)
    framebox = loadImage('section2/framebox.svg');  // 세 번째 이미지 로드 (멘트 상자)

    gbox = loadImage('section2/greenbox.svg');  // 여섯 번째 이미지 로드 -> l_Image1로 바꿀 것
    bbox = loadImage('section2/bluebox.svg');  // 일곱 번째 이미지 로드 -> l_Image2로 바꿀 것
    pbox = loadImage('section2/purplebox.svg');  // 여덟 번째 이미지 로드 -> l_Image3으로 바꿀 것
    promp2 = loadImage('section2/prompter.svg');  // 열한 번째 이미지 로드
    chatting2 = loadImage('section2/chatting2.svg');  // 열 번째 이미지 로드
    

    //우선 사용 안하는 이미지
    reset2 = loadImage('section2/reset2.svg');  // 두 번째 이미지 로드 (리셋 버튼)
    next2 = loadImage('section2/next2.svg');  // 네 번째 이미지 로드 (뒤로 가기)
    previous2 = loadImage('section2/previous2.svg');  // 다섯 번째 이미지 로드 (앞으로 가기))
    picframe = loadImage('section2/pictureframe2.svg');  // 아홉 번째 이미지 로드 (필요 없을 듯)

}

function setup() {
    textFont(project_font);
    textSize(30);
    createCanvas(windowWidth, windowHeight); // 화면 크기 설정
    hwan_selectingImage();

     //supabase 설정
     supabase = createClient(
        'https://fogmydcroufvihnwmvdv.supabase.co', //project url
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZ215ZGNyb3VmdmlobndtdmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyOTA5NTksImV4cCI6MjA0ODg2Njk1OX0.TYNQey0W0BFUJ1R-l9fc_1TFOXrV21kKPmBgWHpckTA' //api key
      );
}

function draw() {
    // yun_case 값이 변경되었을 때만 초기화
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
    text('2전시관은 직접 작품을 설명해보는 공간이에요. \n 그림을 보고 있지 않은 누군가에게 화면에 나타난 그림을 설명해보세요. \n 관람자님의 설명만으로 어떤 그림이 만들어지는지도 확인해보실 수 있답니다!',width/2,195)
    imageMode(CENTER);
    image(l_Image1, width / 4, height / 2 + 60, 300, 300); // 첫 번째 이미지
    image(l_Image2, width / 2, height / 2 + 60 , 300, 300); // 두 번째 이미지
    image(l_Image3, (3 * width) / 4, height / 2 + 60 , 300, 300); // 세 번째 이미지
    text('설명하고 싶은 그림을 선택해주세요!',width/2,height-150)
}

function choi_image() {
    createCanvas(windowWidth, windowHeight); // 화면 크기 설정
    background(255, 194, 180,128);  // 배경색 설정
    tint(255, 255, 255, 255); // 투명도 50% 설정 (알파값 128)

    // section2 로고
    let scaleFactor1 = min(windowWidth, windowHeight) * 0.15 / max(section2.width, section2.height);
    let newWidth1 = section2.width * scaleFactor1;
    let newHeight1 = section2.height * scaleFactor1;
    image(section2, windowWidth / 80, windowHeight / 80, newWidth1, newHeight1);
}

function mousePressed() {
    if (yun_case === 1 && !app) {
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

    } else if (yun_case === 1 && app) {
        // 이미지 생성 후 클릭 이벤트 처리
        app.handleImageClick();

    } else if (yun_case === 2 && case2Viewer) {
        case2Viewer.handleArrowClick();
    }  
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
        background(255, 194, 180, 128);

        imageMode(CORNER)
        // section2 로고
        this.section2Draw()

        imageMode(CENTER)
        
        tint(255, 255, 255, 255); // 투명도 100% 설정
        imageMode(CENTER);
        textSize(24)
        text('버튼을 클릭한 후에는 잠시 기다려주세요. \n 그림이 생성될 때까지는 약 10초 소요됩니다.',width/2,height-100)

        const numInputs = 3;
        const labelsText = [
            "그림에선 어떤 풍경이 보이나요? <br> (날씨와 계절은 어떤지, 색은 어떤지 알려주세요)",
            "그림에서 보이는 사물들에는 어떤 것들이 있나요? <br> (사람이 있다면 표정과 자세를, 사물이 있다면 색이나 모양을 알려주세요)",
            "그림은 어떠한 분위기를 가지고 있나요? <br> (그림에서 느껴지는 인상과 분위기를 적어주세요)"
        ];

        for (let i = 0; i < numInputs; i++) {
            const label = createDiv(labelsText[i]);
            label.position(windowWidth / 2 + 150, 180 + i * 200);
            label.class('box-style');
            this.bubble.resize(570, 250);
            image(this.bubble, windowWidth / 2 + 350, 190 + i * 200);
            this.labels.push(label);

            const inputBox = createInput();
            inputBox.position(windowWidth / 2 + 150, 250 + i * 200);
            inputBox.class('box-style');
            inputBox.size(500);

            this.inputBoxes.push(inputBox);
        }

        // Generate Image 버튼
        this.generateButton = createButton('내 설명으로 만든<br>작품 보기');
        this.generateButton.position(windowWidth * 8 / 10 + 50, windowHeight * 8 / 9 - 20);
        this.generateButton.class('box-style')
        // 버튼 모양 변경
        this.generateButton.style('border', '2px solid black'); // 테두리 제거
        this.generateButton.style('background-color', 'white'); // 배경색
        this.generateButton.style('border-radius', '50px'); // 모서리 둥글게
        this.generateButton.style('padding', '10px 20px'); // 버튼 크기 조정
        this.generateButton.style('cursor', 'pointer'); // 마우스 포인터 설정
        this.generateButton.mousePressed(() => this.generateImage());

        image(this.selectedImage, 400, height / 2, 400, 400);
    }

    async generateImage() {
        this.generateButton.attribute('disabled', 'true');
        this.generateButton.html('작품을 생성중입니다...');

        const userInputs = this.inputBoxes.map(box => box.value()).join(' ');
        const combinedPrompt = `${this.initialValues} ${userInputs}`;
        user_prompt = userInputs;

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
                });

                imageUrl = proxiedUrl;
                this.hideInputsAndButton();

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
        this.inputBoxes.forEach(inputBox => inputBox.hide());
        this.labels.forEach(label => label.hide());
        this.generateButton.hide();
        background(255);
        background(255, 194, 180, 128);  // 배경색 설정
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
    }

    clearContentArea() {
        // 그림과 프롬프트 영역 초기화
        fill(255, 194, 180, 128); // 배경색
        noStroke();
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
}

// Case 2 클래스 인스턴스
let case2Viewer = null;




/*

function draw() {
  background(255, 194, 180);  // 배경색 설정

  // section2
  let scaleFactor1 = min(windowWidth, windowHeight) * 0.15 / max(section2.width, section2.height);
  let newWidth1 = section2.width * scaleFactor1;
  let newHeight1 = section2.height * scaleFactor1;
  image(section2, windowWidth / 80, windowHeight / 80, newWidth1, newHeight1);

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

  // next2
  let scaleFactor4 = min(windowWidth, windowHeight) * 0.13 / max(next2.width, next2.height);
  let newWidth4 = next2.width * scaleFactor4;
  let newHeight4 = next2.height * scaleFactor4;
  let xPos4 = windowWidth * 17.5 / 20;
  let yPos4 = windowHeight * 8.5 / 10;
  image(next2, xPos4, yPos4, newWidth4, newHeight4);

  // previous2
  let scaleFactor5 = min(windowWidth, windowHeight) * 0.13 / max(previous2.width, previous2.height);
  let newWidth5 = previous2.width * scaleFactor5;
  let newHeight5 = previous2.height * scaleFactor5;
  let xPos5 = windowWidth / 20;
  let yPos5 = windowHeight * 8.5 / 10;
  image(previous2, xPos5, yPos5, newWidth5, newHeight5);

 // gbox
  let scaleFactor6 = min(windowWidth, windowHeight) * 0.28 / max(gbox.width, gbox.height);
  let newWidth6 = gbox.width * scaleFactor6;
  let newHeight6 = gbox.height * scaleFactor6;
  let xPos6 = windowWidth * 2.5 / 10;
  let yPos6 = windowHeight * 7.5 / 15;
  image(gbox, xPos6, yPos6, newWidth6, newHeight6);

  // bbox
  let scaleFactor7 = min(windowWidth, windowHeight) * 0.38 / max(bbox.width, bbox.height);
  let newWidth7 = bbox.width * scaleFactor7;
  let newHeight7 = bbox.height * scaleFactor7;
  let xPos7 = windowWidth / 2 - newWidth7 / 2;  // 가로 중앙으로 위치 조정
  let yPos7 = windowHeight * 7 / 15;
  image(bbox, xPos7, yPos7, newWidth7, newHeight7);

  // pbox (간격을 동일하게 설정)
  let scaleFactor8 = min(windowWidth, windowHeight) * 0.3 / max(pbox.width, pbox.height);
  let newWidth8 = pbox.width * scaleFactor8;
  let newHeight8 = pbox.height * scaleFactor8;

  // `gbox`와 `bbox` 간격을 계산하여, `bbox`와 `pbox`의 간격을 동일하게 설정
  let gap = xPos7 - (xPos6 + newWidth6);  // gbox와 bbox 간격
  let xPos8 = xPos7 + newWidth7 + gap;  // bbox와 pbox 간격을 동일하게 설정
  let yPos8 = windowHeight * 8 / 15;
  image(pbox, xPos8, yPos8, newWidth8, newHeight8);

  // picframe
  let scaleFactor9 = min(windowWidth, windowHeight) * 0.7 / max(picframe.width, picframe.height);
  let newWidth9 = picframe.width * scaleFactor9;
  let newHeight9 = picframe.height * scaleFactor9;
  
  // picframe의 xPos를 왼쪽으로 설정
  let xPos9 = windowWidth * 2.4 / 30;  // 왼쪽 위치
  let yPos9 = windowHeight * 2.4 / 10;
  
  image(picframe, xPos9, yPos9, newWidth9, newHeight9);

  // chatting2
  let scaleFactor10 = min(windowWidth, windowHeight)*0.85 / max(chatting2.width, chatting2.height);
  let newWidth10 = chatting2.width * scaleFactor10;
  let newHeight10 = chatting2.height * scaleFactor10;
  
  // chatting2을 화면 정중앙에 위치시키기
  let xPos10 = windowWidth* 9.2/20;  // 가로 중앙
  let yPos10 = (windowHeight - newHeight10) / 2;  // 세로 중앙
  
  image(chatting2, xPos10, yPos10, newWidth10, newHeight10);

  // promp2
  let scaleFactor11 = min(windowWidth, windowHeight)*0.85 / max(promp2.width, promp2.height);
  let newWidth11 = promp2.width * scaleFactor10;
  let newHeight11 = promp2.height * scaleFactor10;
  
  // promp2을 화면 정중앙에 위치시키기
  let xPos11 = windowWidth* 9.2/20;  // 가로 중앙
  let yPos11 = (windowHeight - newHeight10) / 2;  // 세로 중앙
  
  image(promp2, xPos11, yPos11, newWidth11, newHeight11);

}

// 윈도우 크기가 조정될 때마다 캔버스를 재조정
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);  // 캔버스 크기 변경
}
*/