import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


// composant fonction
const Like = () => {
    const [count, setCount] = useState(0)
    const [liked, setLike] = useState(false)
    const [display, setDisplay] = useState(true)

    useEffect(()=> {
        if (count>0) console.log(`you liked ${count} times`)
        if (count === 20) {
            alert("Euh stop s'il te plaît !")
            setDisplay(false)
        }
    },[count])

    useEffect(()=> {
        if (liked) console.log(`you clicked like ! ${liked.toString()}`)
    },[liked])

    return(
        <>
        {(() => display ? <button onClick={() => setCount(count+1)}>{count} Like(s)</button> : <span>{count} likes</span>)()}<br />
        <button onClick={() => setLike(!liked)}>{liked.toString()} Liked</button>
        </>
    )
}

// composant fonction form
const Form = ({id}) => {

    const handleSubmit = (e) => {

        // ne pas poster le formulaire
        e.preventDefault()
        // on définit le contenu de notre formulaire à poster
        const JsonBody = {
            title: e.target.title.value,
            text: e.target.text.value
        }
        // on effectue la requête fetch avec la méthode post
        fetch('https://nest-api-mongodb-crud-quentin.herokuapp.com/posts/',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },           
            body: JSON.stringify(JsonBody)
        })
        .then(response => response.json())
        .then(data => {
            console.log('The script response is: ', data)
        })

        e.target.reset()
    }

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="text" />
            <input type="text" name="text" placeholder="text" />
            <input type="submit" value="comment" />
        </form>
    )
}


// composant class
class App extends React.Component {

    state = {
        error: null,
        isLoaded: false,
        items: []
    }
    
    componentDidMount(){
        console.log("componentDidMount");

        fetch('https://nest-api-mongodb-crud-quentin.herokuapp.com/posts/')
        .then(response => response.json())
        .then(
            data => {
                this.setState({
                    isLoaded: true,
                    items: data
                })
                console.log('Fetch success', data)
            }, 
            error => {
                this.setState({
                    error: error
                })
                console.log(error)
            }
        )
    }

    render(){
        const { error, isLoaded, items } = this.state;     

        if (error){
            return (
                <>
                <div>New Form</div>
                <Form id={items._id} />
                </>
            )
        } else if (!isLoaded) {
            return (
                <div>Chargement toujours en cours...</div>
            )
        } else {
            return (

                items.map( item => (
                    <article key={item._id}>
                        <p><Like /></p>
                        <NavLink to={"/details/" + item._id}>
                        {(() => {
                            if (item.img){
                                return(
                                <img src={"https://nest-api-mongodb-crud-quentin.herokuapp.com/posts/" + item.img} width="100" alt={item.title} />
                                )
                            }
                        })()
                        }

                        <h2>{item.title}</h2>
                        </NavLink>
                        <hr />
                    </article>
                ))

                
            )
        }

        
        
       
    }
  
}

export default App;
