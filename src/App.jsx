import { useEffect, useState } from "react"
import "./App.css"

export default function App() {
    const [inpL, setInpL] = useState("");
    const [outL, setOutL] = useState("");
    const [text, setText] = useState("");
    const [lang, setLang] = useState([]);
    const [output,setOutput]=useState("");
    async function apifetch() {
        const url = 'https://text-translator2.p.rapidapi.com/getLanguages';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'f8b4e0dc5dmsh37605f28de3c926p1f5db5jsn194918acab19',
                'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setLang(result.data.languages);

        } catch (error) {
            console.error(error);
        }
    }
    async function fetchapi2() {
        const url = 'https://text-translator2.p.rapidapi.com/translate';
        const data = new FormData();
        data.append('source_language', inpL);
        data.append('target_language',`${ outL}`);
        data.append('text', text);
        console.log(inpL);
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'f8b4e0dc5dmsh37605f28de3c926p1f5db5jsn194918acab19',
                'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
            },
            body: data
        };

        try {
            const response = await fetch(url, options);
            
            const result = await response.json();
            console.log(result)
            setOutput(result.data.translatedText);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        apifetch();
    }, [])
   
    return (<>
        <h1 style={{ textAlign: "center", marginTop: "2vh", marginBottom: "4vh" }}>Translator</h1>
        <div style={{ margin: "0 auto", width: "80%" }}>
            <label htmlFor="from">From: </label>
            <select name="" value={inpL} onChange={(e) => setInpL(e.target.value)} id="from">
                {lang.map((ele, idx) => {
                    return (
                        <option key={idx} value={ele.code}>
                            {ele.name}
                        </option>
                    )
                })}
            </select>
            <input type="text" style={{ width: "60%", border: "solid black 2px" }} value={text} placeholder="Enter text here" onChange={e => setText(e.target.value)} />
            <label htmlFor="to">To: </label>
            <select name="" value={outL} onChange={(e) => setOutL(e.target.value)} id="to">
                {lang.map((ele, idx) => {
                    
                    return (
                        <option key={idx} value={ele.code}>
                            {ele.name}
                        </option>
                    )
                })}
            </select>
            <button style={{margin:"3vh auto", display:"block",border:"red solid 2px", padding:"1vh"}} onClick={fetchapi2}>Translate</button>
            <textarea style={{ border: "2px solid black", width: "100%", marginTop: "7vh" }} name="" value={output} id=""></textarea>
        </div>
    </>)
}