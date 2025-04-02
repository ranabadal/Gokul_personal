// import React from 'react'
// import Header from '../../components/header/header'
// import Footer from '../../components/footer/footer'
// import styles from './products.module.css'
// import GokulProduct from './GokulProduct/GokulProduct/gokulProduct';
// import SweetProduct from './SweetProduct/SweetProduct/sweetProduct';
// import FilterSection from './FilterSection/FilterSection/filterSection';
// import BulkOrder from './BulkOrder/BulkOrder/bulkOrder';
// import FestiveSweet from './SweetProduct2/SweetProduct2/sweetProduct2'



// const Products = () => {
//   return (
//     <div>
//       <Header/>
//       <GokulProduct/>
//       <div className={styles.heroSec}>
//       <SweetProduct/>
//       <FilterSection/>
//       </div>
//       <BulkOrder/>
//       <FestiveSweet/>
//       <Footer/>
//     </div>
//   )
// }

// export default Products


import React, { useState } from 'react'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import styles from './products.module.css'
import GokulProduct from './GokulProduct/GokulProduct/gokulProduct';
import SweetProduct from './SweetProduct/SweetProduct/sweetProduct';
import FilterSection from './FilterSection/FilterSection/filterSection';
import BulkOrder from './BulkOrder/BulkOrder/bulkOrder';
import FestiveSweet from './SweetProduct2/SweetProduct2/sweetProduct2'

const Products = () => {
  const [filters, setFilters] = useState({});

  return (
    <div>
      <Header/>
      <GokulProduct/>
      <div className={styles.heroSec}>
        <FilterSection onFilterChange={setFilters}/>
        <SweetProduct filters={filters}/>
      </div>
      <BulkOrder/>
      <FestiveSweet/>
      <Footer/>
    </div>
  )
}

export default Products;
