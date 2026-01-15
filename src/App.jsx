import { useState } from 'react'
import { languages } from "./languages"

export default function AssemblyEndgame() {

	const [currentWord, setCurrentWord] = useState("react")

	const alphabet ="qwertyuiopasdfghjklzxcvbnm"
	const keyboardElements = alphabet.split("").map(letter => <button className="key" key="{letter}">{letter.toUpperCase()}</button>)


	const languageElements = languages.map (lang => (
		<span 
			className="chip" 
			style={{backgroundColor: lang.backgroundColor, color: lang.color}}
			key={lang.name}
		>
			{lang.name}
		</span>
	))

	const lettersElements = currentWord.split("").map((letter, index) => <span key={index} className="letter">{letter.toUpperCase()}</span>)

    return (
        <main>
            <header>
				<h1>Assembly: Endgame</h1>
				<p className="description">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
			<section className="game-status">
				<h2 className="status-main">You win!</h2>
				<p className="status-sub">Well done! 🎉</p>
			</section>
			<section className="language-chips">
                {languageElements}
            </section>
			<section className="word">
                {lettersElements}
            </section>
			<section className="keyboard">
                {keyboardElements}
            </section>
			<button className="new-game-btn">New Game</button>
        </main>
    )
}
