import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigate, useNavigate ,useParams} from 'react-router-dom';
import axios from '../../axios';

export const AddPost = () => {
  const {id} = useParams();
  const isAuth = useSelector(selectIsAuth )
  const navigate = useNavigate();
  const [text, setText] = React.useState('');
  // eslint-disable-next-line no-unused-vars
  const [loading, setloading] = React.useState(false);
    // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = React.useState('Umedjon Sharipov');
const isEditing=Boolean(id)
  const onSubmit = async () => {
    try{
      setloading(true)
      const fields = { 
        title,
        text
      }
        // eslint-disable-next-line no-unused-vars
      const {data} = isEditing ? await axios.patch(`/chat/${id}`, fields) : await axios.post('/chat', fields);

      // const _id =data._id;
      navigate(`/`);
    } catch(err) {
      console.warn(err);
      alert('Error !');
    }
  }
  React.useEffect(() => {
    if(id) {
      axios.get(`/chat/${id}`).then(({data})=> {
        setText(data.text);
      }).catch(err => {
        console.warn(err);
      })
    }
  }, [])

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
if(!isAuth){
  return <Navigate to="/"/>
}
  return (
    <Paper style={{ padding: 30 }}>
      <br />
      <br />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
       {isEditing?"Сохранить" : 'Опубликовать' }
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
