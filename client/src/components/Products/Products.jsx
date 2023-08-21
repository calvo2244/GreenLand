import style from './Products.module.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getAllCategories } from '../../redux/action';
import { Product } from '../Product/Product';
import { Pagination } from "../Paginate/Paginate"
import { Filters } from '../Filters/Filters';

export const Products = () => {
  const dispatch = useDispatch();

  const numPageState   = useSelector((state) => state.numPageState)
  const filterProducts = useSelector((state) => state.filterProducts)
  
  const cantProdcutsForPage = 12
  let start     = (numPageState - 1) * cantProdcutsForPage;  
  let end       = numPageState * cantProdcutsForPage;      
  let cantPages = Math.ceil((filterProducts.filteredProducts?filterProducts.filteredProducts.length:filterProducts.length )/ cantProdcutsForPage)
  const dataSlice = filterProducts.filteredProducts?filterProducts.filteredProducts.slice(start, end):filterProducts.slice(start, end)
  console.log('dataslice');
  console.log(dataSlice);

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategories())
  }, [dispatch]) 

  return (
    <>
      <div className={style.prodsParent}>
        <div className={style.prodsDivFilters}> 
          <Filters/>
        </div>

        <div className={`${style.prodsDivProducts} ${style.prodsGrid}`}>
          {dataSlice.map(product => (
            product.active === true &&
            <Product
              key         = { product.id }
              id          = { product.id }
              name        = { product.name }
              categoryId  = { product.category.name }
              description = { product.description }
              price       = { product.price }
              image       = { product.image }
            />
          ))}
        </div>
      </div>

      <div className = {style.paginate}>
        <Pagination numPage = {numPageState} cantPage = {cantPages} />
      </div>
    </>
  )
}
