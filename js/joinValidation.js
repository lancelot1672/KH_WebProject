document.memberForm.addEventListener('submit', (e)=>{
    //submit 바로 직전에 호출
    const userId = userid.value;
    const userPw1 = pw.value;
    const userPw2 = pwConfirm.value;
    const userName = username.value;

    // 유효성 검사
    if(!userId){
        alert("아이디를 입력해주세요.");
        //return false;
        e.preventDefault();
        return;
    }
    if(!userPw1 || !userPw2){
        alert("비밀번호를 입력해주세요");
        //return false;
        e.preventDefault();
        return;
    }
    if(!userName){
        alert("이름을 입력해주세요");
        //return false;
        e.preventDefault();
        return;
    }
});

class Member {
    constructor(userId, password, username){
        this.userId = userId;
        this.password = password;
        this.userName = username;
    }
}

//회원가입
const joinMember = () =>{
    const userId = userid.value;
    const userPw1 = pw.value;
    const userPw2 = pwConfirm.value;
    const userName = username.value;

    //member Class 생성
    const member = new Member(userId,userPw1,userName);
    
    //member 배열 관리
    const members = JSON.parse(localStorage.getItem('members')) || [];
    members.push(member);

    //localStorage에 저장
    localStorage.setItem('members',JSON.stringify(members));

    
    //페이지 리다이렉트
    window.location.href = './index.html';
}

//유효성 검사 로직
const validation = (inputField, validField, query, message) =>{
    query.innerText = message;
    document.querySelector(`#${inputField}`).style.border = "1px solid red";
    document.querySelector(`#${validField}`).style.color = "red";
}
//중복검사 함수
const doubleCheckId = (checkId) =>{
    // 중복아니면 return true
    // 중복이면 return false;
    //localStorage에 있는 멤버 배열 가져오기
    const members = JSON.parse(localStorage.getItem('members')) || [];
    let check = true;

    members.forEach((member) => {
        if(member.userId == checkId){
            // return false 는 forEach를 벗어나게 하는 문법이므로 따로 check 변수에 false를 담아 전달.
            // 중복이면 forEach를 벗어나고 return (check=flase);
            check = false;
            return false;
        }
    });

    //검사 다 통과하면
    return check;
}
// userid 필드 keyup 이벤트
userid.addEventListener('keyup', (e)=>{
    console.log(userid.value);
    //아이디 길이검사
    if(!/^.{8,20}$/.test(userid.value)){
        validation('userid','idValid',idValid, '아이디 8~20자 입력');

        //회원가입 버튼 비활성화
        joinBtn.disabled = true;
        return;
    }
    joinBtn.disabled = false;
    idValid.innerText="";

    //중복확인 예시
    console.log(doubleCheckId(userid.value));
    if(!doubleCheckId(userid.value)){
        validation('userid','idValid',idValid, '이미 등록된 아이디입니다.');
        joinBtn.disabled = true;
    }else{
        document.querySelector('#userid').style.border = "1px solid black";
        idValid.innerText="";
    }
    
});

// 비밀번호 필드 keyup 이벤트
pw.addEventListener('keyup', ()=>{

    const password = pw.value;
    //비밀번호 정규식 검사
    // 길이검사
    if(!/^.{8,20}$/.test(password)){
        validation('pw','pwValid',pwValid, '비밀번호는 8~20자리이여야 합니다.');
        return;
    }
    // 특수문자 포함여부 !&/\*@
    if(!/[!&/\\*@]/.test(password)){
        validation('pw','pwValid',pwValid, '비밀번호에는 특수문자(!&/\\*@)중 1개이상 포함되어야 합니다.');
        return;
    }
    // 숫자 포함여부
    if(!/\d/.test(password)){
        validation('pw','pwValid',pwValid, '비밀번호에는 숫자가 1개이상 포함되어야 합니다.');
        return;
    }
    // 영문자 포함여부
    if(!/[a-z]/i.test(password)){
        validation('pw','pwValid',pwValid, '비밀번호에는 영문자 1개이상 포함되어야 합니다.');
        return;
    }
    pwValid.innerText = "";
});

// 비밀번호 확인 필드 keyup 이벤트
pwConfirm.addEventListener('keyup', ()=>{
    const pw1 = pw.value;
    const pw2 = pwConfirm.value;

    console.log(pw1, pw2);
    if(pw1 != pw2){
        document.querySelector('#pw').style.border = "1px solid red";
        validation('pwConfirm','pwConfirmValid', pwConfirmValid, '두 비밀번호가 다릅니다.');
        joinBtn.disabled = true;
    }else{
        document.querySelector('#pw').style.border = "1px solid black";
        document.querySelector('#pwConfirm').style.border = "1px solid black";
        pwConfirmValid.innerText="";
        joinBtn.disabled = false;
    }
});