import React from 'react'
import createContext from '../createContext'

const ThemeContext = createContext()

class Header extends React.Component {
    static contextType = ThemeContext
    render() {
        this.context1 = Header.contextType.Provider.value
        return (
            <div
                style={{ border: `5px solid ${this.context1.color}`, padding: 5 }}
            >
                this is header
                <Title />
            </div>
        );
    }
}

class Title extends React.Component {
    static contextType = ThemeContext
    render() {
        this.context1 = Title.contextType.Provider.value
        return (
            <div
                style={{ border: `5px solid ${this.context1.color}`, padding: 5 }}
            >
                this is title of header
            </div>
        );
    }
}

class Main extends React.Component {
    static contextType = ThemeContext
    render() {
        this.context1 = Main.contextType.Provider.value
        return (
            <div
                style={{ border: `5px solid ${this.context1.color}`, padding: 5 }}
            >
                this is main
                <Content />
            </div>
        );
    }
}


class Content extends React.Component {
    static contextType = ThemeContext
    render() {
        this.context1 = Main.contextType.Provider.value
        return (
            <div
                style={{ border: `5px solid ${this.context1.color}`, padding: 5}}
            >
                this is content of main
                <button onClick={() => this.context1.changeColor('red')}>变红</button>
                <button onClick={() => this.context1.changeColor('green')}>变绿</button>
            </div>
        );
    }
}

export default class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = { color: 'green' }
    }

    changeColor = (color) => {
        this.setState({ color })
    }

    render() {
        let value = { 
            color: this.state.color, 
            changeColor: this.changeColor
        }
        return (
            <ThemeContext.Provider value={value}>
                <div
                    style={{ border: `5px solid ${this.state.color}`, padding: 5 }}
                >
                    <Header />
                    <Main />
                </div>
            </ThemeContext.Provider>
        );
    }
}
