import React from 'react';

export default function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImages: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMeme, setAllMeme] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMeme(data.data.memes))
    }, [])


    function getMemeImages() {

        const randomNumber = Math.floor(Math.random() *allMeme.length)
        const url = allMeme[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme, 
            randomImages: url
        }))
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme, [name]: value
        }))
    }

    return(
        <main>
            <form>
               <div className='row pt-1'>

                   <div className='col-lg-6 col-md-6 col-sm-12'>
                    <input text="" placeholder='top text'
                    value={meme.topText}
                    name='topText'
                    onChange={handleChange} />
                   </div>

                   <div className='col'>
                    <input text="" placeholder='bottom text'
                    value={meme.bottomText}
                    name='bottomText'
                     onChange={handleChange} />
                   </div>
                   
                   </div> 
            </form>

            <button onClick={getMemeImages} className='btn-btn bg-danger w-100
            '>GET NEW IMAGE 🖼</button>
            <div className='meme'>
            <img alt='meme images' className='img-fluid memeimags' src={meme.randomImages} />
            <h1 className='meme--text top'>{meme.topText}</h1>
            <h1 className='meme--text bottom'>{meme.bottomText}</h1>
            </div>

        </main>
    )
}