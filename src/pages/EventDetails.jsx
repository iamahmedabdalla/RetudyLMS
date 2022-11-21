import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, setDoc, getDocs, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from 'react-router-dom';
import { Alert, Button, message, Drawer, Divider } from 'antd';
import 'antd/dist/antd.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { data } from 'autoprefixer';
import 'antd/dist/antd.css';
import MyProjects from './MyProjects';
import { async } from '@firebase/util';
const EventDetails = () => {
    const { id } = useParams();

    const { user } = UserAuth();
    const userUID = user.uid;

    const [event, setEvent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getEvent = async () => {
            try {
                const eventDoc = await getDoc(doc(db, "events", id));
                if (eventDoc.exists()) {
                    setEvent({ ...eventDoc.data(), id: eventDoc.id });
                } else {
                    setError("No such document!");
                }
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        getEvent();
    }, [id]);
    


  return (
    <div>EventDetails</div>
  )
}

export default EventDetails