const themeBtn = document.querySelector(".theme-btn");
const themeIcon = themeBtn.querySelector("i");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }else{
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
});