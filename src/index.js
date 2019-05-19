import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';


class Joke extends React.Component {
    constructor(props) {
        super(props);
        this.updateInfo = this.updateInfo.bind(this);
        this.showJoke = this.showJoke.bind(this);
        this.showPunchline = this.showPunchline.bind(this);
        this.toggleOn = this.toggleOn.bind(this);
        this.addToFavorite = this.addToFavorite.bind(this);
        this.showFavorite = this.showFavorite.bind(this);
        this.switchIsFavoriteToggleOn = this.switchIsFavoriteToggleOn.bind(this);

        this.state = {
            setup: "",
            punchline: "",
            isToggleOn: true,
            isFavoriteToggleOn: false
        };

    }

    updateInfo() {
        this.getJoke();
        this.toggleOn(false);
        if (this.state.isFavoriteToggleOn) {
            this.switchIsFavoriteToggleOn();
        }
    }

    showPunchline() {
        return (
            <div>
                {this.state.punchline}
            </div>
        )
    }

    toggleOn(boolCondition = false) {
        this.setState(state => ({
            isToggleOn: boolCondition
        }));
    }

    getJoke() {
        fetch("https://official-joke-api.appspot.com/random_joke")
            .then(response => response.json())
            .then(data => {
                const obj = data;
                this.setState({ setup: obj["setup"], punchline: obj["punchline"] });

                console.log(`setup: ${this.state.setup}      punchline: ${this.state.punchline}`);
            })
            .catch(() => {
                console.log("Error!");
            });
    }

    showJoke() {
        return (
            <div>
                {this.state.setup}
                <br></br>
                {this.state.isToggleOn ? this.showPunchline() : ' '}
            </div>
        );
    }

    addToFavorite() {
        localStorage.setItem(this.state.setup, this.state.punchline);
    }

    showFavorite() {
        let string = "";

        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            string += `${key} <br>${localStorage[key]}<br><br>`;
        }

        function createMarkup() { return { __html: string }; };

        return (<div dangerouslySetInnerHTML={createMarkup()} />);

    }

    switchIsFavoriteToggleOn() {
        this.setState(state => ({
            isFavoriteToggleOn: !state.isFavoriteToggleOn
        }));
    }


    render() {
        return (
            <div id="container">

                <div id="sidebar">

                    <button id="nextJoke" class="buttonClass" onClick={this.updateInfo}>GET A RANDOM JOKE</button> <br></br>

                    {(this.state.setup.length) ? (<button id="showPunch" class="buttonClass" onClick={this.toggleOn}>SHOW PUNCHLINE</button>) :
                        <div class="divNoButtonClass"></div>}<br></br>

                    {(this.state.setup.length) ? (<button id="addToFavorite" class="buttonClass" onClick={this.addToFavorite}>ADD TO FAVORITEE</button>) :
                        <div class="divNoButtonClass"></div>}<br></br>

                    <button id="showFavorite" class="buttonClass" onClick={this.switchIsFavoriteToggleOn}>SHOW/HIDE FAVORITE JOKES</button>
                </div>

                <div id="head">
                    <h1 id="pageName">Get a joke!</h1>
                </div>

                <div id="textPole">
                    {this.state.isFavoriteToggleOn ? this.showFavorite() : this.showJoke()}
                </div>

            </div>
        );
    }
}



ReactDOM.render(
    <Joke />,
    document.getElementById('root')
); 
