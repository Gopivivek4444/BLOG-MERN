import React from 'react'
import { MdOutlineCalendarMonth } from "react-icons/md";
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import userIcon from '@/assets/images/user.png'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RouteBlogDetails } from '@/helpers/RouteName';

const BlogCard = ({ props }) => {
  return (
    <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
      <Card className="pt-5 h-[400px] w-full overflow-hidden flex flex-col justify-between">
        <CardContent className="h-full flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={props.author.avatar || userIcon} />
              </Avatar>
              <span className="text-sm">{props.author.name}</span>
            </div>
            {props.author.role === 'admin' && (
              <Badge variant="outline" className="bg-violet-500 text-white">
                Admin
              </Badge>
            )}
          </div>

          <div className="my-2 h-[200px] overflow-hidden rounded">
            <img
              src={props.featuredImage}
              className="w-full h-full object-cover"
              alt="featured"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <p className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <MdOutlineCalendarMonth />
              <span>{moment(props.createdAt).format('DD-MM-YYYY')}</span>
            </p>
            <h2 className="text-xl font-bold line-clamp-2 leading-tight">
              {props.title}
            </h2>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
