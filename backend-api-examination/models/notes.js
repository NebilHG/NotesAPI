const {res} = require('express');
const nedb = require('nedb-promise');
const database = new nedb ({filename: 'notes.db', autoload: true});
const uuid = require('uuid-random');







async function getNotes(){
    return await database.find({});
 }




 
 
 async function addNote(note) {
    const noteObj = {
        id: uuid(),
        title: note.title,
        text: note.text,
        createdAt: new Date(),
        modifiedAt: new Date()
    };
    return await database.insert(noteObj);
}
 



 
 
 async function removeNote(id){
     const result =  await database.remove({ id: id });
 
     if (result>0){
         return {
             success: true, 
             notes: await getNotes()
         }
     } else{
         return {
             success: false,
             message: 'No note found with that id'
         }
     }
 }






 async function updateNote(id, updatedNote) {
    const existingNote = await database.findOne({ id: id });
    
    if (!existingNote) {
      return {
        success: false,
        message: 'No note found with that id'
      }
    }
    
    const updatedNoteObj = {
      id: id,
      title: updatedNote.title || existingNote.title,
      text: updatedNote.text || existingNote.text,
      createdAt: existingNote.createdAt,
      modifiedAt: new Date()
    };
    
    const result = await database.update({ id: id }, updatedNoteObj);
    
    if (result > 0) {
      return {
        success: true,
        notes: await getNotes()
      }
    } else {
      return {
        success: false,
        message: 'Note update failed'
      }
    }
  }

  async function findNoteByTitle(title) {
    const note = await database.findOne({ title: title });
    
    if (!note) {
        return {
        success: false,
        message: 'No note found with that title',
        };
    } else {
        return {
        success: true,
        note: note,
        };
      }
    }
 
 
 
 module.exports = {getNotes, addNote, removeNote, updateNote, findNoteByTitle}