document.loginForm.addEventListener('submit', (e)=>{
    const idValue = userid.value;
    const pwValue = password.value;

    // 유효성 검사
    if(!idValue){
        alert("아이디를 입력해주세요.");
        //return false;
        e.preventDefault();
        return;
    }
    if(!pwValue){
        alert("비밀번호를 입력해주세요");
        //return false;
        e.preventDefault();
        return;
    }
});

const loginVaild = ()=>{

}