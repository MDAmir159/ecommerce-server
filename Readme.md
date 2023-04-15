
# E-Commerce Backend

Coding assessment for M360ICT recruitment process.



## Installation
#### Server Installation
To run this project on your local machine do follow the instructions
```bash
git clone https://github.com/MDAmir159/ecommerce-server.git
cd ecommerce-server
```
Necessary dependencies are inscribed in the package.json file. Now install the dependencies.
```bash
npm install
```
#### Add .env file to root server directory
```bash
API_HOST = localhost
API_USER = root
API_PASSWORD =
API_DATABASE = crud_test
API_CONNECTION_LIMIT = 
API_PORT = 5000
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
API_EMAIL =
API_EMAIL_PASSWORD =
BASE_LINK = http://localhost:5000/
```
#### Database setup
Openup a phpmyadmin server. There is a crud_test.sql file is available in e-mail as an attachment. Import on your phpmyadmin server. Database name should be as inscribed in the .env file.

#### Start running with Nodemon 
Now, start the project on your local machine.
```bash
npm run devStart
```

#### Test the REST APIs 
Openup POSTMAN app. There is a crud_test.postman_collection file is available in the attachment section of the email. Import it on your POSTMAN and there you can see necessary APIs to interact with the server.


## API Reference

#### 1) Get all colors with Description

```http
  GET /color
```

#### 2) Add a new color

```http
  POST /color
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required** |

#### 3) Update color informations
```http
PATCH /color
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `colorId`      | `integer` | **Required** |
| `name`      | `string` | **Required** |

#### 4) Delete color by id
```http
DELETE /color/by_id
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `colorId`      | `integer` | **Required** |

#### 5) Delete color by name
```http
DELETE /color/by_name
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `colorName`      | `string` | **Required** |

#### 6) Get all sizes with Description

```http
  GET /size
```

#### 7) Add a new size

```http
  POST /size
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required** |

#### 8) Update size informations
```http
PATCH /size
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `sizeId`      | `integer` | **Required** |
| `name`      | `string` | **Required** |

#### 9) Delete size by id
```http
DELETE /size/by_id
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `sizeId`      | `integer` | **Required** |

#### 10) Delete size by name
```http
DELETE /size/by_name
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `sizeName`      | `string` | **Required** |


#### 11) Get list of child nodes of a parent category **(only available ones)**
```http
GET /category/adjacencyList
```
#### 12) Update a category status
```http
PATCH /category/updateCategoryStatus
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `categoryId`      | `integer` | **Required** |
| `statusId`      | `integer` | **Required** |

#### 13) Add a new category
```http
POST /category/add_category
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `integer` | **Required** |
| `parent_id`      | `integer` | **Required** |
| `status_id`      | `integer` | **Required** |

#### 14) Update parent category 
```http
PATCH /category/update_parentCategory
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `targetParent`      | `integer` | **Required** |
| `replacedParent`      | `integer` | **Required** |


#### 15) Delete a category
```http
DELETE /category/delete_category
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `categoryId`      | `integer` | **Required** |


#### 16) Get products by a name
```http
GET /product/search_by_name
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productName`      | `string` | **Required** |

#### 17) GET details of a specific product
```http
GET /product/product_details
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productId`      | `integer` | **Required** |

#### 18) GET product list under a category
```http
GET /product/productlist_by_category
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `categoryId`      | `integer` | **Required** |

#### 19) GET product lsit under a category and other attributes
```http
GET /product/productlist_by_category_and_attributes
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `categoryId`      | `integer` | **Required** |
| `size_id`      | `integer` | optional |
| `color_id`      | `integer` | optional |

#### 20) Update product details
```http
PATCH /product/update_product
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required** |
| `name`      | `string` | **Required** |
| `color_id`      | `integer` | **Required** |
| `size_id`      | `integer` | **Required** |
| `leaf_category`      | `integer` | **Required** |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_HOST`

`API_USER`

`API_PASSWORD`

`API_DATABASE`

`API_PORT`

`BASE_LINK`


#### Thanks for reading
