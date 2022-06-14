// let data = {"update":"11111","puix":[{ "tits": "KYO", "date": "2021.09 ~ 2022.04", "plce": "KYO", "tech": [ "CSS", "HTML", "JS", "Mobile" ], "imgs": "./img/ss/ssKyobo.jpg", "urls": "https://kimkee.gitlab.io/Kyobo" }, { "tits": "마켓", "date": "2021.04 ~ 2021.08", "plce": "롯데", "tech": [ "HTML", "CSS", "JS", "Mobile" ], "imgs": "./img/ss/ssLhmk.jpg", "urls": "https://kimkee.gitlab.io/htmt" }, { "tits": "3333", "date": "2021.04 ~ 2021.08", "plce": "롯데", "tech": [ "HTML", "CSS", "JS", "Mobile" ], "imgs": "./img/ss/ssLhmk.jpg", "urls": "https://kimkee.gitlab.io/htmt" }]} ;
	
const { useState } = React;

const App = (props) => { 
	console.log(data);
	const [text, setText] = useState(data);
	const renderTech = (tt) => {
		const result = [];
		for (let i in text.puix[tt].tech) {
			result.push(
				<em key={i}>{text.puix[tt].tech[i]} </em>
			);
			// console.log(tt);
		}
		return result;
	};
	
	const renderPuix = () => {
		const result = [];
		for (let i in text.puix) {
			result.push(
				<li key={i}>
					<h5>{ text.puix[i].tits }</h5>
					<h5>{ text.puix[i].date }</h5>
					<h5>{ text.puix[i].plce }</h5>
					<h5>{ renderTech(i) }</h5>
					<h5>{ text.puix[i].imgs }</h5>
					<h5>{ text.puix[i].urls }</h5>
				</li>
			); 
			console.log(text.puix[i]);
		}
		return result;
		
		// let html = "";
		// text.puix.map(function(name, index) {
		// 	console.log(name.tits);
		// 	result += `
		// 		<li key=${index}>
		// 			${name.tits}
		// 		</li>
		// 	 `
		// })
		// console.log(result.innerHtml);
		// return result;
	};

	return (
		<div>
			<span>update = {text.update} </span>
			<span>assign = {text.assign} </span>
			<span>opend = {text.opened+''}</span>
			{/* <input type="text" value={text.update} onChange={(e) => setText(e.target.value)} /> */}
			{/* <div className="list"> {text.puix[0].tits}</div> */}

			<ul>{renderPuix()}</ul>
			
			<Mbox></Mbox>
			<button type="button" onClick={ ()=>{
				setText("PPP") ;
				console.log(text)
			}}>dfsf</button>
			
		</div>
	);
}

const Mbox = () => {
	return(
		<ul>
			<li className="box">jkdsfdssflj;l </li>
			<li className="box">jklj;l </li>
			<li className="box">jklj;l </li>
		</ul>
	)
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);