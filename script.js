// 1. pehly element ko access krna hy box or button ko 
let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#btn-reset")
// access krna hy msg-container ko or new game btn ko bhi 
let msgContainer=document.querySelector(".msg-container");
let newGameBtn=document.querySelector("#new-gamebtn");
let winMsg=document.querySelector("#msg");

// 2. ab hum ko kuch varible cchy ky pata chaly pehly knsa player khaly ga X or O kyo ky is my alternative turn hoty hy

let turnOfO= true //palyer X,player O 
let count=0;      //track draw game


// 3. 2D Array (banye gy taka winning Patterns ko store krwa sakian hum )
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

// 4.addEventListener (hr box pr click krny sy koi action perform hona chhy )
boxes.forEach( (box)=>{
     box.addEventListener("click",()=>{
        //console.log("box was clicked");
        /*box.innerHTML="abcd";  hum ko yani dana hy hum ko ya batana hy ky X hy ya O or ya hum ko 
        turnOfO var batye ga pehly isko true kiya hoa to O aye ga phr false set krna hy to X aye ga 
        or  the again is var ko true set kr dana hy taka next time O aye ek click ky bad dubara 
        button pr change nahi ana chhy agr user agin button press kare to button ko disabled kr dana hy */ 

        if(turnOfO)
        {
             box.innerHTML="O"; 
             box.style.color="#C63C51";  //yaha boxes kyo ni use kr sakty hy error ata hy?
             turnOfO=false;
        }
        else{
            box.innerHTML="X"
            box.style.color="#131842";
            turnOfO=true;
        }
        /* Button ko dispabled krna hy taka ek br user click kare to jo value hy wahi rahy dubara 
        is btton ko click krny pr value change na ho  ,, to is sy box pr ek effect aye ga to is ky liya box 
        ka background color change kr lo*/ 

        box.disabled=true;

        /*ab hum ko check krna hy ky winner kn hy winning patterns check krny hy to loop use karen gy hum 
        idher inko check karny ky liya or then declare kare gy , ab three positions diff index pr dekhy jaye gy
        ky agr in indexs pr wo pattern bn raha jo oper likhy hy hum ny to wo winner ho ga .
        
        ab ya chez hr box pr click krny pr check hogy to hum is loop my wo function likhy gy*/
        count++;
        let isWinner=checkWinner();

        if(count===9 && !isWinner){
            gameDraw();
        }
        
     });
});




// Disabled boxes function (bcz jab winner agya to is ky bad boxes ko disabled krn ahy taka dubara winner change na ho sakay)
const disabledBoxes=()=>{
     for(let box of boxes)
     {
        box.disabled=true;
     }
}

// Draw game method
const gameDraw=()=>
    {     
        winMsg.innerText="Game was a draw !!!";
        msg.style.textShadow="0px 3vmin vmin2px #131842";
        //hide ko remove is liya kare gy taka msg print ho winner wala
        msgContainer.classList.remove("hide");
        disabledBoxes();   //function to disable box after announce the winner
    }

// Show winner ka funtion
const showWinner=(winner)=>
{     
    winMsg.innerText=`Congratulations, Winner is ${winner}`;
    msg.style.textShadow="0px 2vmin 2vmin #131842";
    //hide ko remove is liya kare gy taka msg print ho winner wala
    msgContainer.classList.remove("hide");
    disabledBoxes();   //function to disable box after announce the winner
}
 
// Check winner function

const checkWinner=()=>{
       for( let  pattern of winPatterns)
       {
             /*ab pattern sy positions nikalni hy hum ko wo kasey nikaly gy hum index ky thorugh
             console.log(pattern[0],pattern[1],pattern[2]);
             /*is line of code sy pata chaly ga ky boxes ki array my individual box ko access kase kr sakty hy
             console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);
             /*ab is positions pr kya element hy X ya O wo check krny liya hum idher boxes ki array
             ko use karen gy then check hoga 
             console.log(boxes[pattern[0]].innerHTML,boxes[pattern[1]].innerHTML,boxes[pattern[2]].innerHTML);*/

            /*hum ab value of boxes ko access krny ky bad inko calculate kr sakty hy or winner ko decide kr sakty hy
              
            That is main code */  
           let pos1Vla=boxes[pattern[0]].innerHTML;
           let pos2Vla=boxes[pattern[1]].innerHTML;
           let pos3Vla=boxes[pattern[2]].innerHTML;
        /*ab agr position one pr agr ek vlaue hy or baki boxes empty hy to wo winner to ni ho skata hy 
        to hum ko ya check krna hy ky three ki three positions fill honi chhy empty ni honi chhy*/  
        if(pos1Vla!="" &&  pos2Vla!="" && pos3Vla!="" )  
        {
            if(pos1Vla===pos2Vla && pos2Vla===pos3Vla)
                {
                            //console.log("winner",pos1Vla);
                            showWinner(pos1Vla);
                }
        }     
         
       }
};

// Enabled boxes function (jab new game start ho to sare boxes enabled ho jaye again)
const enabledBoxes=()=>{
    for(let box of boxes)
    {
       box.disabled=false;
    //game ko reset krna hy or boxes ky inner text ko empty krna hy  
      box.innerText="";   
    }
}
// Reset Game button function
 const resetGame=()=>{
     turnOfO=true;
     count=0;
     enabledBoxes();
   //or ab msg-container ko hide krna hy bcz new game start hoye hy to is ky liya hide class again add krni hy
   msgContainer.classList.add("hide");   
 }

//addEventListener to NewGame button and reset game button
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
