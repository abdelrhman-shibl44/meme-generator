import React, { useEffect, useState } from "react"
export default function Main() {
    let [formData, setFormData] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1bij.jpg",
    });
    const [allMemes, setAllMemes] = useState([])
    function handleClick(e) {
        e.preventDefault()
        const itemsLength = allMemes.length
        let randomItem = Math.floor(Math.random() * itemsLength)
        let newImage = allMemes[randomItem].url;
        setFormData(prevData => ({
            ...prevData,
            randomImage: newImage
        }))
    }
    function handleChange(e) {
        e.preventDefault()
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value

        }))
    }
    useEffect(() => {
        (async () => {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            return setAllMemes(data.data.memes)
        })()
    }, [])
    return (
        <main>
            <div className="container">
                <form onSubmit={handleClick} className="form">
                    <input
                        type="text"
                        placeholder="top text"
                        name="topText"
                        value={formData.topText}
                        onChange={handleChange}
                    >
                    </input>
                    <input
                        type="text"
                        name="bottomText"
                        value={formData.bottomText}
                        placeholder="bottom text"
                        onChange={handleChange}
                    >
                    </input>
                    <input
                        className="button"
                        type="submit"
                        value="Get a new meme image"
                    />
                </form>
                <div className="exper">
                    <img src={formData.randomImage} />
                    <div className="info">
                        <p className="topInfo">{formData.topText}</p>
                        <p className="bottomInfo">{formData.bottomText}</p>
                    </div>
                </div>
            </div>
        </main >
    )
}