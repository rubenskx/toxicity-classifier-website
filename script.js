



function predict()
{
document.getElementById("loading-message").style.display = "block";
var isToxic = false;
const threshold = 0.9;
var outputText = document.getElementById('output');
outputText.innerHTML = "";
toxicity.load(threshold).then((model) => {
  const text = document.getElementById('content').value;
  //console.log(text);
  const sentences = [text];
  console.log(typeof(sentences));
  let count = 0;
  model.classify(sentences).then((predictions) => {
    console.log(predictions);
    for (i = 0; i < 7; i++) {
      if (predictions[i].results[0].match) {
        isToxic = true;
        count++;
        document.getElementById("loading-message").style.display = "none";
        let num = predictions[i].results[0].probabilities[1]*100;
        //  outputText.innerHTML += 
        //   predictions[i].label +
        //     " was found with probability of " +
        //     num.toPrecision(3) + "%" + "<br/>";
        let tox = predictions[i].label;

        document.getElementById(tox).style.display = "block";
      }
    }
    if(count>0)
    {
    document.getElementById("count-message").style.display = "block";
    var tagsCount = document.getElementById("count-message");
    tagsCount.innerHTML = count + " Tags Found";

    }
  });
});
 setTimeout(() => {
if (!isToxic)
{ document.getElementById("loading-message").style.display = "none"; 
  outputText.innerHTML = "Your sentence is not toxic!";
 } 
}, 8000)


}

function cleanScreen()
{
console.log("Hello");
var outputText = document.getElementById('output');
outputText.innerHTML = "";
document.getElementById('content').value='';
document.getElementById("count-message").style.display = "none";
const toxArray = ["identity attack","obscene","insult","severe toxicity","sexual explicit","threat","toxicity"];
for(let i = 0; i < 7; i++)
{
    document.getElementById(toxArray[i]).style.display="none";
}

}