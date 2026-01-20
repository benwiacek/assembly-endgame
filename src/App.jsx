import { useState } from 'react'
import { languages } from "./languages"
import clsx from 'clsx'

export default function AssemblyEndgame() {

	const [currentWord, setCurrentWord] = useState("react")
	const [guessedLetters, setGuessedLetters] = useState([])

	const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

	const isGamewon = currentWord.split("").every(letter => guessedLetters.includes(letter))
	const isGameLost = wrongGuessCount >= (languages.length - 1)
	const isGameOver =  isGamewon || isGameLost

	const alphabet = "qwertyuiopasdfghjklzxcvbnm"

	function addGuessedLetter(letter) {
		setGuessedLetters(prevLetters => prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter])
    }

	const languageElements = languages.map ((lang, index) => {
		const isLost = index < wrongGuessCount
		const className = clsx("chip", isLost && "lost")

		return (
			<span 
				className = {className}
				style={{backgroundColor: lang.backgroundColor, color: lang.color}}
				key={lang.name}
			>
				{lang.name}
			</span>
		)
	})

	const letterElements = currentWord.split("").map((letter, index) => (
		<span key={index} className="letter">
			{guessedLetters.includes(letter) && letter.toUpperCase()}
		</span>
	))

	const keyboardElements = alphabet.split("").map(letter => {
		const isGuessed = guessedLetters.includes(letter)
		const isCorrect = isGuessed && currentWord.includes(letter)
		const isWrong = isGuessed && !currentWord.includes(letter)
		const className = clsx("key", {
			greenKey: isCorrect,
			redKey: isWrong
		})
		
		return (
		<button 
            className={className}
			key={letter} 
			onClick={() => addGuessedLetter(letter)}
		>
			{letter.toUpperCase()}
		</button>
		)
	})

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
                {letterElements}
            </section>
			<section className="keyboard">
                {keyboardElements}
            </section>
			{isGameOver &&	<button className="new-game-btn">New Game</button>}
        </main>
    )
}