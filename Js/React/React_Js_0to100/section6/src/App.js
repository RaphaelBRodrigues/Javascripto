import React from 'react';
import "./style.scss";

class App extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            posts:[]
        }

    }

    componentDidMount(){
        fetch("https://sujeitoprogramador.com/rn-api/?api=posts")
        .then((data)=>{
            console.log(data);
            data.json().then(json => {
                console.log(json);
                this.setState({posts:json});
            });
        })
        .catch((err)=>{console.error(err);});
    }


    render(){
        return(
            <div className="container">
                {this.state.posts.map((post)=>{
                    return(
                        <article key={post.id}>
                           <h2> {post.titulo} </h2>
                           <h4> {post.subtitulo} </h4>
                           <picture>
                               <img src={post.capa} />
                           </picture>
                            <button>
                                Ver mais
                            </button>
                        </article>
                    );
                })}
            </div>
        );
    }
}

export default App;