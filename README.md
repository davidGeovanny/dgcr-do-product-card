# DGCR-DO-Product-Card

Este es un paquete de pruebas de despliegue en NPM

### David Geovanny

## Ejemplo
```
import { ProductCard } from 'dgcr-do-product-card';
```

```
<ProductCard 
    key={ product.id }
    product={ product }
    initialValues={{
        count: 4,
        maxCount: 5,
    }}
>
    {
        () => (
            <>
                <ProductCard.Image />
                <ProductCard.Title />
                <ProductCard.Buttons />
            </>
        )
    }
</ProductCard>
```