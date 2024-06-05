import React, { useState, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import { TbTimelineEventFilled } from "react-icons/tb";
import { MdAddModerator } from "react-icons/md";
import { TbLanguageKatakana } from "react-icons/tb";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  LineChart,
  Line,
} from 'recharts';
import Authentication from '../../Hooks/Authentication';
import Loader from '../../Loader/Loader';
import UseHelmetTitle from '../../Hooks/UseHelmetTitle';

const DashBoardHome = () => {
   const {user, loading} = Authentication();
   if(loading){
      return <Loader/>
   }
   const data = [
      {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];

  return (
    <div className="w-full">
      <UseHelmetTitle title={"Dashboard Home"} />
      <h1 className="text-2xl font-bold mb-6">Hi, Welcome Back! {user?.displayName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Box 01 */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-6 flex items-center">
          <TbTimelineEventFilled size={64} color="#fff" />
          <div className="ml-4">
            <h2 className="text-3xl font-bold text-white">Event</h2>
            <p className="text-xl text-white">85%</p>
          </div>
        </div>
        {/* Box 02 */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-6 flex items-center">
          <FaUsers size={64} color="#fff" />
          <div className="ml-4">
            <h2 className="text-3xl font-bold text-white">Users</h2>
            <p className="text-xl text-white">78%</p>
          </div>
        </div>
        {/* Box 03 */}
        <div className="bg-gradient-to-r from-pink-400 to-red-400 rounded-lg p-6 flex items-center">
          <MdAddModerator size={64} color="#fff" />
          <div className="ml-4">
            <h2 className="text-3xl font-bold text-white">Moderator</h2>
            <p className="text-xl text-white">65%</p>
          </div>
        </div>
        {/* Box 04 */}
        <div className="bg-gradient-to-r from-blue-400 to-teal-400 rounded-lg p-6 flex items-center">
          <TbLanguageKatakana size={64} color="#fff" />
          <div className="ml-4">
            <h2 className="text-3xl font-bold text-white">Revenue</h2>
            <p className="text-xl text-white">63%</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className="mb-8 ">
        <h2 className="text-xl font-bold mb-4">Bar Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Line Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </div>
    </div>
  );
};

export default DashBoardHome;
