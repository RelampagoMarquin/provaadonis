/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'FilmesController.index').as('filme.index')
  Route.get('/create', 'FilmesController.create').as('filme.create')
  Route.post('/create', 'FilmesController.store').as('filme.store')
  Route.get('/:id/edit', 'FilmesController.edit').where('id', /^[0-9]+$/).as('filme.edit')
  Route.post('/:id/edit', 'FilmesController.update').where('id', /^[0-9]+$/).as('filme.update')
  Route.get('/:id/delete', 'FilmesController.delete').where('id', /^[0-9]+$/).as('filme.delete')
}).prefix('/filmes')
