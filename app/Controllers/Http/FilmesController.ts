import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Filme from 'App/Models/Filme'

export default class FilmesController {
    async index ({view} : HttpContextContract){
        const filmes = await Filme.query().orderBy('created_at', 'desc')
        return view.render('filmes/index', {
            filmes
        })
    }
    async create ({view, session} : HttpContextContract){
        const filme = session.flashMessages.get('filme') || {}
        return view.render('filmes/create', {
            filme
        })
    }

    async delete ({ params, response } : HttpContextContract){
        try{
            const filme = await Filme.findOrFail(params.id)
            await filme.delete()
        }catch(e){

        }
        return response.redirect().toRoute('filme.index')
    }

    async  store({ request, response, session} : HttpContextContract){
        const dados = request.only(['nome', 'ator', 'resumo', 'ano'])
        try {
            await Filme.create(dados)
            return response.redirect().toRoute('filme.index')
        } catch (e) {
            console.log(e)
            session.flash('erro', 'Erro ao cadastrar filme')
            session.flash('filme', dados)
            return response.redirect().toRoute('filme.create')
        }
        
    }

    async  edit({params, view} : HttpContextContract){
        const filme = await Filme.findOrFail(params.id)
        return view.render('filmes/edit', {
            filme
        })
    }

    async  update({params, request, response} : HttpContextContract){
        const filme = await Filme.findOrFail(params.id)
        filme.merge(request.only(['nome', 'ator', 'resumo', 'ano']))
        try {
            await filme.save()
        } catch(e){
            
        }

        return response.redirect().toRoute('filme.index')
    }
}
