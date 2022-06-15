//const SearchBox = (props) => {
const SearchBox = ({fnregresa}) => {

  const doSearch = (event) => {
    //props.fnregresa(event.target.value);
    fnregresa(event.target.value);
  }

  return (
    <input type="text" placeholder='Buscar' onChange={doSearch} />
  );
}

const SearchText = 'Hola desde SearchBox';

//export default SearchBox;

export {SearchBox};

//export default SearchText;