import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions.js'




const HomeScreen = () => {
    const dispatch = useDispatch()

    //displays the products
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
      dispatch(listProducts())
    }, [dispatch])
  
    return (
      <>
        <h1>Latest Products</h1>
        {loading ? (
          <h2>loading...</h2>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </>
    )
}

export default HomeScreen
