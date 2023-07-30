import { jsPDF } from "jspdf";

export const DownloadPdf = (data)=>{
  const doc = new jsPDF(); //this will create a pdf of A4 size
  // console.log("data coming to page : ", data);
  let x = 10, y = 10;
  doc.text("Title",x,y);
  doc.text("Genre",x+100,y);
  doc.text("Rating",x+170,y);
  y=30;
  let a = 1;
  for(let i = 0; i<data.length; i++){
    if(y>=240){
      doc.addPage();
      y = 40;
    }
    console.log("Element at ", i ," is ",data[i]);
    doc.text(a+". "+data[i].title,x,y);
    doc.text(data[i].genre[0].name+", "+data[i].genre[1].name,x+100,y);
    doc.text(" "+data[i].rating,x+170,y);
    y+= 13;
    a++;
  }
  
  // console.log("something is wrong");
  doc.save("MovieList.pdf"); //this command will download the file
}
