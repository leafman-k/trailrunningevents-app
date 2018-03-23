import React, {PropTypes} from 'react';

function pagesToArray(numOfPages){
  let pageArray = [];
  for(let i = 1; i <= numOfPages; i++){
    pageArray.push(i);
  }
  console.log("pages: " + pageArray);
  return pageArray;
}
const Pagination = ({numOfPages, currentPage, setCurrentPage, onNext, onPrevious})=>{

  const pages = pagesToArray(numOfPages);

  return (
    <nav aria-label="Page navigation">
    <ul className="pagination">
      <li className={currentPage == 1? 'previous disabled' : 'previous'}>
        <a href="#" aria-label="Previous" onClick={onPrevious}>
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      {pages.map((item, index) => (
        <li key={index} className={currentPage == item ? 'active': ''}><a href="#" onClick={setCurrentPage} data-id={item}>{item}</a></li>
      ))
      }

    <li className={currentPage == numOfPages ? 'next disabled' : 'next'}>
      <a href="#" aria-label="Next" onClick={onNext} >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
  </nav>
  );
};
Pagination.propTypes = {
  numOfPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired
};

export default Pagination;
