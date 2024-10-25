// main.js
import { sendDataToServer } from './class.js';
// const sample = new sample();
let i = 0;
const contentLists = {};

document.addEventListener("DOMContentLoaded", () => {
    // const contentList = [];
    //これは好みの問題ですが、よく使うものは先に宣言しておこう。もちろん敢えて中にいれて極力副作用を減らす努力も殊勝ですがね。
    const button1 = document.getElementById("button1");
    const text1 = document.getElementById("content1");
    const text2 = document.getElementById("content2");  
    button1.addEventListener("click", function() {
        //別に空白が入ることを否定するわけでなく、飽くまで空白のみを除外したいだけなので、replaceは後まわし。
        const message1 = text1.value/*.replace(/[\s\u3000]/g, "")*/;
        const message2 = text2.value/*.replace(/[\s\u3000]/g, "")*/;

        //敢えてじゃない方を除外することで、クソ長インデントを解消し、可読性を向上します。よく使う技だから覚えておこう。私も最近知った。
        if(message1.replace(/[\s\u3000]/g, "") == "" || message2.replace(/[\s\u3000]/g, "") == "") {
            alert("両方入力しろ");
            return;//このreturnで関数から出ていくので、以降の処理は実行されないよ。
        }

        i++;
        contentLists[i] = [];
        contentLists[i].push(message1);
        contentLists[i].push(message2);
        console.log(i + ":"+ contentLists[i]);

        text1.value = "";
        text2.value = "";

        const resultDiv = document.getElementById("result");

        //これについては、さほど問題ありませんが、一度総て消して、for文などで総てもう一度羅列する方法を使えば、後々楽できるかもしれません。
        const newContent = document.createElement('div');
        newContent.id = "id" + i
        const content1 = contentLists[i][0];
        const content2 = contentLists[i][1];
        newContent.textContent = `単語: ${content1}, 意味: ${content2}`;
        resultDiv.appendChild(newContent);

        sendDataToServer(contentLists)
        .then(data => {
            if (data.status === "success") {
                // console.log(data);
                const resultDiv = document.getElementById("result");

                const newContent = document.createElement('div');
                newContent.id = "id" + i;
                const content1 = contentLists[i][0];
                const content2 = contentLists[i][1];
                newContent.textContent = `単語: ${content1}, 意味: ${content2}`;
                resultDiv.appendChild(newContent);
            }else{
                // console.error(data);
            }
        })
        .catch((error) => console.error(error));//まぁ、例外がある以上、catchはあってもいいでしょう。

        document.addEventListener("click", () => {
            
        });
    });

    //ほんの戯れ、要するにenter押すだけでtext移動したり、submitてきたら嬉しいよねって話。
    const texts = [text1, text2];
    for(let i=0;i<2;i++) {
        const current = texts[i];
        const complement = texts[!i + 0];//[]の中は0,1を反転させるやつです。ようするにcurrentでない方を取得します。覚えなくていいです。貴方がjsFuckをしない限り。
        current.addEventListener('keydown', (e) => {
            if(e.key != "Enter") return;
            if(current.value.replace(/[\s\u3000]/g, "") == "") {
                alert("入力しろや");
                return;
            } else if(complement.value.replace(/[\s\u3000]/g, "") == "") {
                complement.focus();
            } else {
                button1.click();
            }
        })
    }
}); 