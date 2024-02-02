
const tableBody = document.getElementById('tableBody');
const timer= document.getElementById('timer');
const loader= document.getElementById('loader');
const averagePrice= document.getElementById('averagePrice');


const fetchData = async () => {
    try {
        const res = await fetch('api/v1/data');
        const data = await res.json();
        
        displayTable(data);                                                         // once fetched, displaying in the table

    } catch (error) {
        console.log(error.message);
    }   
}

// functions for calculating table related data

const getAverage= (data)=>{
    let average=0;
    data.forEach((item)=>{
        average+= Number(item.last); 
    })

    average= parseInt(average/data.length);

    return average;
}

const calcSavings= (obj,avg)=>{
    const diff= calcDiff(obj,avg);
    const savings= parseInt((diff/100)* avg);

    let colorClassName= savings<0? 'text-red-500' : 'color-customblue';

    return `<h4 class="${colorClassName}">₹ ${savings} </h4>`
}

const calcDiff= (obj,avg)=>{

    let diff = (Number(obj.sell)-avg)*100/avg;
    return diff.toFixed(2);
}

const getDiff= (obj,avg)=>{
    const diff= calcDiff(obj,avg)
    let colorClassName= diff<0? 'text-red-500' : 'color-customblue';

    return `<h4 class="${colorClassName}"> ${diff} % </h4>`
}

const displayTable = (data) => {
    let index=0;
    htmlText='';

    const average= getAverage(data);
    averagePrice.innerText= `₹ ${average}`;                     

    data.forEach(element => {
        index++;
        htmlText+=
        `
            <tr class="font-semibold text-xs md:text-2xl background "> 
                <td>
                    <h4>${index}</h4>
                </td>
                <td>
                    <h4>${element.name}</h4>
                </td>
                <td>
                    <h4>₹ ${element.last}</h4>
                </td>
                <td>
                    <h4 ><span>₹ ${element.buy} / ₹ ${element.sell}</span></h4>
                </td>
                <td>
                    ${getDiff(element,average)}
                </td>
                <td>
                    ${calcSavings(element,average)}
                </td>
            </tr>
        `
    });

    tableBody.innerHTML=htmlText;
    startTimer();                                                    // starting timer of 60 second for next fetch. 
    hideLoader();                                                    // all data displayed. Page loaded with all data. Hence disable loader gif.
   
}

const startTimer= ()=>{
    let countDown=60;

    const intervalID= setInterval(() => {
        timer.innerText= --countDown;
    }, 1000);
    setTimeout(()=>clearInterval(intervalID),60*1000);
    
}

fetchData()                                                     // fetch the data initially on loading

setInterval(()=>{                                               // fetch data every 60 seconds 
    fetchData()
    console.log("fetched data after 1 minute");
    
}, 60*1000);



const hideLoader= ()=>{
    loader.classList.add('hidden');
}


