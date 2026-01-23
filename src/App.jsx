import { useState } from 'react'
import { languages } from "./languages"
import clsx from 'clsx'
import { getFarewellText, getNewWord } from "./utils"
import Confetti from "react-confetti"

export default function AssemblyEndgame() {

	const [currentWord, setCurrentWord] = useState(() => getNewWord())
	const [guessedLetters, setGuessedLetters] = useState([])
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const numGuessesLeft = languages.length - 1 - wrongGuessCount

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

	const letterElements = currentWord.split("").map((letter, index) => {
		const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
		const letterClassName = clsx("letter", 
			isGameLost && !guessedLetters.includes(letter) && "lost"
		)
			return (
			<span key={index} className={letterClassName}>
				{shouldRevealLetter && letter.toUpperCase()}
			</span>
			)
})

	const keyboardElements = alphabet.split("").map(letter => {
		const isGuessed = guessedLetters.includes(letter)
		const isCorrect = isGuessed && currentWord.includes(letter)
		const isWrong = isGuessed && !currentWord.includes(letter)
		const className = clsx("key", {
			greenKey: isCorrect,
			redKey: isWrong,
		})
		
		return (
		<button 
            className={className}
			key={letter} 
			onClick={() => addGuessedLetter(letter)}
			disabled= {isGameOver}
			aria-disabled={guessedLetters.includes(letter)}
		>
			{letter.toUpperCase()}
		</button>
		)
	})

	function startNewGame() {
		setCurrentWord(getNewWord())
		setGuessedLetters([])
	}

    return (
        <main>
			{isGameWon && 
				<Confetti 
					recycle={false}
                    numberOfPieces={1000}
				/>
			}
            <header>
				<h1>Assembly: Endgame</h1>
				<p className="description">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
			
			<section
				aria-live="polite" 
                role="status" 
                className={gameStatusClass}
			>
				{renderGameStatus()}
			</section>

			<section className="language-chips">
                {languageElements}
            </section>

			<section className="word">
                {letterElements}
            </section>
		
		{/* Combined visually-hidden aria-live region for status updates */}
			<section 
				className="sr-only"
				aria-live="polite"
				role="status"
			>
				<p>
					{currentWord.includes(lastGuessedLetter) ?
						`Correct! The letter ${lastGuessedLetter} is in the word.` :
						`Sorry, the letter ${lastGuessedLetter} is not the word.`
					}
					You have {numGuessesLeft} attempts left.
				</p>
				<p>Current word: {currentWord.split("").map(letter => 
					guessedLetters.includes(letter)? letter + "." : "blank.")
					.join(" ")}</p>
			</section>

			<section className="keyboard">
                {keyboardElements}
            </section>
			{isGameOver &&	<button className="new-game-btn" onClick={() => startNewGame()}>New Game</button>}
        </main>
    )
}