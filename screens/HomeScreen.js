
// import React,{useContext} from "react";
// import {View,Text,StyleSheet,FlatList} from 'react-native'
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {Container,Card, UserInfo, UserImg,UserName,UserInfoText, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText, Divider} from '../styles/FeedStyles'
// import PostCard from "../components/PostCard";

// const Posts = [
//     {
//       id: '1',
//       userName: 'Jenny Doe',
//       userImg: require('../assets/users/user-3.jpg'),
//       postTime: '4 mins ago',
//       post:
//         'Hey there, this is my test for a post of my social app in React Native.',
//       postImg: require('../assets/posts/post-img-3.jpg'),
//       liked: true,
//       likes: '14',
//       comments: '5',
//     },
//     {
//       id: '2',
//       userName: 'John Doe',
//       userImg: require('../assets/users/user-1.jpg'),
//       postTime: '2 hours ago',
//       post:
//         'Hey there, this is my test for a post of my social app in React Native.',
//       postImg: 'none',
//       liked: false,
//       likes: '8',
//       comments: '0',
//     },
//     {
//       id: '3',
//       userName: 'Ken William',
//       userImg: require('../assets/users/user-4.jpg'),
//       postTime: '1 hours ago',
//       post:
//         'Hey there, this is my test for a post of my social app in React Native.',
//       postImg: require('../assets/posts/post-img-2.jpg'),
//       liked: true,
//       likes: '1',
//       comments: '0',
//     },
//     {
//       id: '4',
//       userName: 'Selina Paul',
//       userImg: require('../assets/users/user-6.jpg'),
//       postTime: '1 day ago',
//       post:
//         'Hey there, this is my test for a post of my social app in React Native.',
//       postImg: require('../assets/posts/post-img-4.jpg'),
//       liked: true,
//       likes: '22',
//       comments: '4',
//     },
//     {
//       id: '5',
//       userName: 'Christy Alex',
//       userImg: require('../assets/users/user-7.jpg'),
//       postTime: '2 days ago',
//       post:
//         'Hey there, this is my test for a post of my social app in React Native.',
//       postImg: 'none',
//       liked: false,
//       likes: '0',
//       comments: '0',
//     },
//   ];

// const HomeScreen = ()=> {
   
//     return (
//             <Container>
//                 <FlatList data={Posts}
//                 renderItem={({item})=><PostCard item ={item}/>}
//                 keyExtractor={item=>item.id}
//                 />
//             </Container>
//     )
// }

// export default HomeScreen;





import React,{useContext,useEffect, useState} from "react";
import {View,Text,StyleSheet,FlatList,Alert} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container,Card, UserInfo, UserImg,UserName,UserInfoText, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText, Divider} from '../styles/FeedStyles'
import PostCard from "../components/PostCard";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


const Posts = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../assets/users/user-3.jpg'),
      postTime: '4 mins ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-3.jpg'),
      liked: true,
      likes: '14',
      comments: '5',
    },
    {
      id: '2',
      userName: 'John Doe',
      userImg: require('../assets/users/user-1.jpg'),
      postTime: '2 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '8',
      comments: '0',
    },
    {
      id: '3',
      userName: 'Ken William',
      userImg: require('../assets/users/user-4.jpg'),
      postTime: '1 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-2.jpg'),
      liked: true,
      likes: '1',
      comments: '0',
    },
    {
      id: '4',
      userName: 'Selina Paul',
      userImg: require('../assets/users/user-6.jpg'),
      postTime: '1 day ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-4.jpg'),
      liked: true,
      likes: '22',
      comments: '4',
    },
    {
      id: '5',
      userName: 'Christy Alex',
      userImg: require('../assets/users/user-7.jpg'),
      postTime: '2 days ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '0',
      comments: '0',
    },
  ];

const HomeScreen = ()=> {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              userId,
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Test Name',
              userImg:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, []);


  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };


  const deletePost = (postId) => {
    console.log('Current Post Id: ', postId);

    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };


  const deleteFirestoreData = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting posst.', e));
  };


   
    return (
            <Container>
                <FlatList data={posts}
                renderItem={({item})=><PostCard item ={item} onDelete ={handleDelete} />}
                keyExtractor={item=>item.id}
                showsVerticalScrollIndicator = {false}
                />
            </Container>
    )
}

export default HomeScreen;




