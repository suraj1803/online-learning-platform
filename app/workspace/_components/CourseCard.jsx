import { Button } from '@/components/ui/button';
import { Book, PlayCircle, Settings } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect } from 'react'

function CourseCard({course}) {
  const courseJson=course?.courseJson?.course;
  return (
    <div className='shadow rounded-xl'>
      <Image src={course?.bannerImageUrl} alt={course?.name} height={400} width={400} className='w-full aspect-video rounded-t-xl object-cover'></Image>
      <div className='p-3  flex flex-col gap-3'>
        <h2 className='font-bold text-lg'>{courseJson?.name}</h2>
        <p className='line-clamp-3 text-gray-500 text-sm'>{courseJson?.description}</p>
        <div className='flex justify-between items-center'>
          <h2 className='flex items-center gap-2 text-sm'><Book className='text-primary h-5 w-5'></Book>{courseJson?.noOfChapters} Chapters</h2>
          {course?.courseContent.length ? <Button size={'sm'}><PlayCircle></PlayCircle> Start Learning</Button>:
          <Link href={'/workspace/edit-course/'+course?.cid}>
          <Button  size={'sm'} variant="outline"><Settings></Settings> Generate Course</Button>
          </Link>
          }
        </div>
      </div>
    </div>
  )
}

export default CourseCard