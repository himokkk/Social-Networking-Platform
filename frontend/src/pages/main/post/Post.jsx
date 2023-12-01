import React, { useState } from 'react';
import img from 'zyzz.jpg';
const Post = () => {

   const [postState] = useState({
    zdjecie: 'zyzz.jpg',
    tekst: 'Tutaj jest treść posta.',
    komentarze: [
      { tresc: 'Pierwszy komentarz', autor: 'Autor1' },
      { tresc: 'Drugi komentarz', autor: 'Autor2' },
    ],
    polubienia: [
      { autor: 'User1' },
      { autor: 'User2' },
    ],
  });

  const wyswietlZdjecie = postState.zdjecie && <img src={postState.zdjecie} alt="" />;

  return (
    <div>
       <img src= {img} alt="Opis zdjęcia" />
       <p>ddd</p>
      <p>{postState.tekst}</p>
      {wyswietlZdjecie}
    </div>
  )
}

export default Post
