import { useState } from 'react'
import { languages } from "./languages"
import clsx from 'clsx'
import { getFarewellText } from "./utils"

export default function AssemblyEndgame() {

	const [currentWord, setCurrentWord] = useState("react")
	const [guessedLetters, setGuessedLetters] = useState([])

	const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

	const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
	const isGameLost = wrongGuessCount >= languages.length - 1
	const isGameOver =  isGameWon || isGameLost

	const lastGuessedLetter = guessedLetters[guessedLetters.length-1]
	const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

	const alphabet = "qwertyuiopasdfghjklzxcvbnm"

	function addGuessedLetter(letter) {
		setGuessedLetters(prevLetters => prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter])
    }

	function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
				return <p className="farewell-message">{getFarewellText((languages[wrongGuessCount-1]).name)}</p>
		}
		
		if (isGameWon) {
			return (
				<>
					<h2>You win!</h2>
					<p>Well done! 🎉</p>
				</>
			)
		} if (isGameLost) {
			return (
				<>
					<h2>Game over!</h2>
					<p>You lost. Better start learning Assembly 😭</p>
				</>
			)
		}

		return<p></p>
	}

	const gameStatusClass = clsx("game-status", {
		won: isGameWon,
		lost: isGameLost,
		farewell: !isGameOver && isLastGuessIncorrect
	})



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
			<section className={gameStatusClass}>
				{renderGameStatus()}
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