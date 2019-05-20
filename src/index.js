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
            <div class="container">

                <div class="sidebar">

                    <button id="nextJoke" class="button-сlass" onClick={this.updateInfo}>GET A RANDOM JOKE</button> <br></br>

                    {(this.state.setup.length) ? (<button id="showPunch" class="button-сlass" onClick={this.toggleOn}>SHOW PUNCHLINE</button>) :
                        <div class="div-no-button-class"></div>}<br></br>

                    {(this.state.setup.length) ? (<button id="addToFavorite" class="button-сlass" onClick={this.addToFavorite}>ADD TO FAVORITEE</button>) :
                        <div class="div-no-button-class"></div>}<br></br>

                    <button id="showFavorite" class="button-сlass" onClick={this.switchIsFavoriteToggleOn}>SHOW/HIDE FAVORITE JOKES</button>
                </div>

                <div class="head">
                    <h1 class="page-name">Get a joke!</h1>
                </div>

                <div class="text-pole">
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
