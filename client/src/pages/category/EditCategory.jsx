import React from 'react'
import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button' 
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import slugify from 'slugify'
import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getEnv'
import { useParams } from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch'

const EditCategory = () => {
        const {category_id} = useParams();
        const {data: categoryData, loading, error} =  useFetch( `${getEnv("VITE_API_BASE_URL")}/category/showCategory/${category_id}`,{
            method: "put",
            credentials: "include"
             },[category_id]) 
        

             
        const formSchema = z.object({
          name: z.string().min(3, "Name must be at least 3 character long"),
          slug: z.string().min(3, "Slug must be at least 3 character long"),
          
        });
      
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            name: "",
            slug: "",
          },
        });

        const CategoryName = form.watch('name');

        useEffect(() => {
          
             if(CategoryName) {
               const slug = slugify(CategoryName, {lower: true})
               form.setValue('slug', slug);
             }
        },[CategoryName])

        useEffect(() =>{
          if(categoryData) {
            console.log(categoryData)
            form.setValue('name', categoryData.category.name)
            formSchema.setValue('slug', categoryData.category.slug)
          }
        })
      
       async function onSubmit(values) {
          try {
              const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/category/updateCategory/${category_id}`,{
              method: "put",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
              })
      
              const data = await response.json()
      
              if(!response.ok) {
                  return showToast('error',data.message)
              }
      
              
              showToast('success',data.message)
          } catch (error) {
              showToast('error',error.message)
          }
        }
      
  return (
    <div>
      <Card className='pt-5 max-w-screen-md mx-auto'>
        <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <Button type="submit" className="w-full">
                Submit
              </Button>
          </form>
        </Form>
        </CardContent>
        
      </Card>
    </div>
  )
}

export default EditCategory