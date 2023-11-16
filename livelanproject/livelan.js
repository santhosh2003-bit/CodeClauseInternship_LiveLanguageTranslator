
    let lefttext = document.querySelector('.leftext');
    let righttext = document.querySelector('.rightext');
    const sync_alt=document.querySelector("#sync_alt");
  const selecttag=document.querySelectorAll('select');
  const btn=document.querySelector("#btn")
  const voice2=document.querySelector("#voice2");
 const voice1=document.querySelector('#voice1')
  
    selecttag.forEach((tag,id)=>{
 for(let countrycode in language){
  const selected=id==0 ? countrycode=="en-GB" ? "selected":"": countrycode=="de-DE" ? "selected" :"";
  let option=`<option ${selected} value="${countrycode}">${language[countrycode]}</option>`;
  tag.insertAdjacentHTML("beforeend",option);
 }
    })
  


    sync_alt.addEventListener("click",()=>{

      let tempText=lefttext.value
      let tempLang=selecttag[0].value;
      lefttext.value=righttext.value;
      righttext.value=tempText;
      selecttag[0].value=selecttag[1].value;
      selecttag[1].value=tempLang;
    


    });


  lefttext.addEventListener("keyup",()=>{
    if(!lefttext){
      righttext.value="";
    }
  })


btn.addEventListener("click",()=>{

  const text=lefttext.value.trim();
  const translationfrom=selecttag[0].value;
  const translationto=selecttag[1].value;
  if(!text) return;
  righttext.setAttribute("placeholder","Translation.....");
  const apiurl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translationfrom}|${translationto}`;
  fetch(apiurl)
  .then((res)=>res.json())
  .then((data)=>{
    righttext.value=data.responseData.translatedText;
    data.matches.forEach((data)=>{
      if(data.id===0){
        righttext.value=data.translation;
      }
    });
  
    righttext.setAttribute("placeholder","Translation");
  })


})


voice1.addEventListener("click",()=>{
  let fromspeak=new SpeechSynthesisUtterance(lefttext.value);
  fromspeak.lang=selecttag[0].value
  speechSynthesis.speak(fromspeak)
})


voice2.addEventListener("click",()=>{
  let tospeak=new SpeechSynthesisUtterance(righttext.value);
  tospeak.lang=selecttag[1].value
  speechSynthesis.speak(tospeak)
})
