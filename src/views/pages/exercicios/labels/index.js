import React, { useEffect, useState } from 'react';
// import './style.modules.scss';
import { WithContext as ReactTags } from 'react-tag-input';
import { RemoteServices } from 'services';


import { toast } from 'react-toastify';

const suggestions = [
  { id: "1", text: "portugues" },
  { id: "2", text: "matematica" },
  { id: "3", text: "ingles" },
  { id: "4", text: "historia" },
  { id: "5", text: "geografia" },
  { id: "6", text: "fisica" },
  { id: "7", text: "biologia" },
  { id: "8", text: "quimica" },
  { id: "9", text: "artes" },
  { id: "10", text: "sociologia" },
  { id: "11", text: "redacao" }

];

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Tags = ({
  listId
}) => {

  const [tags, setTags] = React.useState([]);

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    Addlabel({
      tag: tag
    })
    // setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };


  useEffect(() => {
  }, [])

  const Addlabel = ({
    tag
  }) => {
    RemoteServices.Teachers.UpdateLabels({
      idActivity: 1, data: {
        listId: listId,
        labels: [{
          id: 1,
          kind: "global",
          action: "add"
        }]
      }
    }).then((e) => {
      if (e?.id) {
        setTags([...tags, tag]);
        return
      }
      toast.error('Erro ao salvar alterações!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    })
      .catch(() => {
        toast.update(
          {
            render: "Erro ao salvar alterações!",
            type: "error",
            isLoading: false,
            position: "bottom-center",
            autoClose: 2000

          });
      })

  }

  return (<>
    <ReactTags
      tags={tags}
      suggestions={suggestions}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      handleTagClick={handleTagClick}
      inputFieldPosition="bottom"
      autocomplete
      placeholder='adicionar tag'
    />
  </>
  );
};

export default Tags