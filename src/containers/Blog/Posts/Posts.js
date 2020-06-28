import React, { Component } from 'react';
import axios from '../../../axios';
import { Route, withRouter } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        axios.get( '/posts' )
            .then( response => {
                const posts = response.data.slice( 0, 4 );
                const updatedPosts = posts.map( post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                } );
                this.setState( { posts: updatedPosts } );
            } )
            .catch( error => {
                // this.setState({error: true});
            } );
    }

    deleteHandler = ( id ) => {
        var newPosts = this.state.posts.slice().filter(item => item.id != id);
        console.log("After delete", newPosts);
        this.setState( { posts: newPosts } );
    }

    postSelectedHandler = ( id ) => {
        // this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push( '/posts/' + id );
    }

    render () {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if ( !this.state.error ) {
            posts = this.state.posts.map( post => {
                return (
                    // <Link to={'/posts/' + post.id} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        delete={this.deleteHandler}
                        clicked={() => this.postSelectedHandler( post.id )} />
                    // </Link>
                );
            } );
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact render={props => <FullPost delete = {this.deleteHandler} {...props}/>}/>
                {/*render={props => <FullPost delete = {this.deleteHandler} {...props}/>}*/}
            </div>
        );
    }
}

export default withRouter(Posts);