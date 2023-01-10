import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CardView from 'react-native-cardview';
import {useFocusEffect} from '@react-navigation/native';
import {activeRentals} from '../apiCalls/apiCall';

import {ListOfVehiclesItems} from './ListOfVehiclesItems';
import CustomSwitch from '../../../Components/Custom_Switch/CustomSwitch';
import BottomSheetSkelton from '../../Map/BottomSheet/BottomSheetSkelton';
import {Colors} from '../../../Theme';
import { getRentalVehicles } from './apiCalls/apiCall';

const ListOfVehicles = () => {
  const [switchValue, setSwitchValue] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes, setRoute] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);
  const Payload = {
    pending: [
      {
        _id: '63b3ff1c18b68dee166f311a',
        renter: {
          _id: '63b2e16f5ea05e8e22a9831f',
          username: 'Muzammil',
          email: 'muzammilabbasi732@gmail.com',
          phone: '03032626732',
          isRenter: false,
          role: 'user',
          firebaseToken: '',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-02T13:51:43.534Z',
          updatedAt: '2023-01-02T13:51:43.534Z',
          __v: 0,
        },
        rentee: {
          _id: '63b3d897c8298e8717040848',
          username: 'Owais928',
          email: 'sp19bscs0007@maju.edu.pk',
          phone: '03323766916',
          isRenter: false,
          role: 'user',
          firebaseToken:
            'f8t7_cuvSj6L8l6Kz-Bp2U:APA91bGuTb8B5jFYp4XYZi-ml12QTpKvOizWaDEosbHT9P3ZYK3OjH_7Kt7XsWAgwLwbweJkOA5aJjOnTWgYIsDcfAnOVBxDH_rmhRxzbNkG6D3FpdqMBe9qbl0su1syhwUkpqzlRswZ',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-03T07:26:15.122Z',
          updatedAt: '2023-01-03T15:12:00.462Z',
          __v: 0,
        },
        vehicle: {
          pickupLocation: {
            type: 'Point',
            coordinates: [24.860198250184723, 67.07084356219261],
          },
          _id: '63b3d70885bb87e547044e8d',
          vehicleOwner: '63b2e16f5ea05e8e22a9831f',
          vehicleCategory: '63b2e2015ea05e8e22a98322',
          brand: 'CHANGAN',
          model: 'ALSVIN',
          year: '2021',
          registrationNumber: 'CPC-9696',
          vehicleType: 'SEDAN',
          isAvailable: false,
          isBooked: false,
          description: 'HONDA BRV 10/10 Condition ',
          noOfSeats: '4',
          fuelType: 'Petrol',
          noOfAirbags: '4',
          isAutomatic: true,
          noOfDoors: '4',
          isAircondition: false,
          images: [
            'http://localhost:8000/public/images/vehicles/changan-1672730376474-469717879.jpeg',
            'http://localhost:8000/public/images/vehicles/Changan-Alsvin-Lumiere-In-pakistan-1672730376479-984529555.jpeg',
          ],
          vehiclePapers: [
            'http://localhost:8000/public/images/vehicle-papers/vehicle-Registration-Card-1672730376503-558648591.jpeg',
          ],
          vehicleInsurance: [
            'http://localhost:8000/public/images/vehicle-insurance/vehicle-insurance-image-1672730376507-311210899.jpeg',
          ],
          selfDriveDailyCharges: 3000,
          approvalStatus: '2',
          reasonForRejection: '',
          averageRating: 0,
          createdAt: '2023-01-03T07:19:36.685Z',
          updatedAt: '2023-01-03T07:19:36.685Z',
          __v: 0,
        },
        startTime: '2023-01-24T10:00:08.000Z',
        endTime: '2023-01-26T10:00:08.000Z',
        startCode: null,
        endCode: null,
        bookingConfirmed: false,
        rentalStatus: '0',
        totalAmount: 6000,
        rentalDuration: 2,
        renteeLocation: [],
        createdAt: '2023-01-03T10:10:36.630Z',
        updatedAt: '2023-01-03T10:10:36.630Z',
        __v: 0,
      },
      {
        _id: '63b3ffb718b68dee166f3125',
        renter: {
          _id: '63b2e16f5ea05e8e22a9831f',
          username: 'Muzammil',
          email: 'muzammilabbasi732@gmail.com',
          phone: '03032626732',
          isRenter: false,
          role: 'user',
          firebaseToken: '',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-02T13:51:43.534Z',
          updatedAt: '2023-01-02T13:51:43.534Z',
          __v: 0,
        },
        rentee: {
          _id: '63b3d897c8298e8717040848',
          username: 'Owais928',
          email: 'sp19bscs0007@maju.edu.pk',
          phone: '03323766916',
          isRenter: false,
          role: 'user',
          firebaseToken:
            'f8t7_cuvSj6L8l6Kz-Bp2U:APA91bGuTb8B5jFYp4XYZi-ml12QTpKvOizWaDEosbHT9P3ZYK3OjH_7Kt7XsWAgwLwbweJkOA5aJjOnTWgYIsDcfAnOVBxDH_rmhRxzbNkG6D3FpdqMBe9qbl0su1syhwUkpqzlRswZ',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-03T07:26:15.122Z',
          updatedAt: '2023-01-03T15:12:00.462Z',
          __v: 0,
        },
        vehicle: {
          pickupLocation: {
            type: 'Point',
            coordinates: [24.860198250184723, 67.07084356219261],
          },
          _id: '63b3d70885bb87e547044e8d',
          vehicleOwner: '63b2e16f5ea05e8e22a9831f',
          vehicleCategory: '63b2e2015ea05e8e22a98322',
          brand: 'CHANGAN',
          model: 'ALSVIN',
          year: '2021',
          registrationNumber: 'CPC-9696',
          vehicleType: 'SEDAN',
          isAvailable: false,
          isBooked: false,
          description: 'HONDA BRV 10/10 Condition ',
          noOfSeats: '4',
          fuelType: 'Petrol',
          noOfAirbags: '4',
          isAutomatic: true,
          noOfDoors: '4',
          isAircondition: false,
          images: [
            'http://localhost:8000/public/images/vehicles/changan-1672730376474-469717879.jpeg',
            'http://localhost:8000/public/images/vehicles/Changan-Alsvin-Lumiere-In-pakistan-1672730376479-984529555.jpeg',
          ],
          vehiclePapers: [
            'http://localhost:8000/public/images/vehicle-papers/vehicle-Registration-Card-1672730376503-558648591.jpeg',
          ],
          vehicleInsurance: [
            'http://localhost:8000/public/images/vehicle-insurance/vehicle-insurance-image-1672730376507-311210899.jpeg',
          ],
          selfDriveDailyCharges: 3000,
          approvalStatus: '2',
          reasonForRejection: '',
          averageRating: 0,
          createdAt: '2023-01-03T07:19:36.685Z',
          updatedAt: '2023-01-03T07:19:36.685Z',
          __v: 0,
        },
        startTime: '2023-01-24T10:00:08.000Z',
        endTime: '2023-01-26T10:00:08.000Z',
        startCode: null,
        endCode: null,
        bookingConfirmed: false,
        rentalStatus: '0',
        totalAmount: 6000,
        rentalDuration: 2,
        renteeLocation: [],
        createdAt: '2023-01-03T10:13:11.261Z',
        updatedAt: '2023-01-03T10:13:11.261Z',
        __v: 0,
      },
      {
        _id: '63b3ffd818b68dee166f3130',
        renter: {
          _id: '63b2e16f5ea05e8e22a9831f',
          username: 'Muzammil',
          email: 'muzammilabbasi732@gmail.com',
          phone: '03032626732',
          isRenter: false,
          role: 'user',
          firebaseToken: '',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-02T13:51:43.534Z',
          updatedAt: '2023-01-02T13:51:43.534Z',
          __v: 0,
        },
        rentee: {
          _id: '63b3d897c8298e8717040848',
          username: 'Owais928',
          email: 'sp19bscs0007@maju.edu.pk',
          phone: '03323766916',
          isRenter: false,
          role: 'user',
          firebaseToken:
            'f8t7_cuvSj6L8l6Kz-Bp2U:APA91bGuTb8B5jFYp4XYZi-ml12QTpKvOizWaDEosbHT9P3ZYK3OjH_7Kt7XsWAgwLwbweJkOA5aJjOnTWgYIsDcfAnOVBxDH_rmhRxzbNkG6D3FpdqMBe9qbl0su1syhwUkpqzlRswZ',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-03T07:26:15.122Z',
          updatedAt: '2023-01-03T15:12:00.462Z',
          __v: 0,
        },
        vehicle: {
          pickupLocation: {
            type: 'Point',
            coordinates: [24.860198250184723, 67.07084356219261],
          },
          _id: '63b3d70885bb87e547044e8d',
          vehicleOwner: '63b2e16f5ea05e8e22a9831f',
          vehicleCategory: '63b2e2015ea05e8e22a98322',
          brand: 'CHANGAN',
          model: 'ALSVIN',
          year: '2021',
          registrationNumber: 'CPC-9696',
          vehicleType: 'SEDAN',
          isAvailable: false,
          isBooked: false,
          description: 'HONDA BRV 10/10 Condition ',
          noOfSeats: '4',
          fuelType: 'Petrol',
          noOfAirbags: '4',
          isAutomatic: true,
          noOfDoors: '4',
          isAircondition: false,
          images: [
            'http://localhost:8000/public/images/vehicles/changan-1672730376474-469717879.jpeg',
            'http://localhost:8000/public/images/vehicles/Changan-Alsvin-Lumiere-In-pakistan-1672730376479-984529555.jpeg',
          ],
          vehiclePapers: [
            'http://localhost:8000/public/images/vehicle-papers/vehicle-Registration-Card-1672730376503-558648591.jpeg',
          ],
          vehicleInsurance: [
            'http://localhost:8000/public/images/vehicle-insurance/vehicle-insurance-image-1672730376507-311210899.jpeg',
          ],
          selfDriveDailyCharges: 3000,
          approvalStatus: '2',
          reasonForRejection: '',
          averageRating: 0,
          createdAt: '2023-01-03T07:19:36.685Z',
          updatedAt: '2023-01-03T07:19:36.685Z',
          __v: 0,
        },
        startTime: '2023-01-24T10:00:08.000Z',
        endTime: '2023-01-26T10:00:08.000Z',
        startCode: null,
        endCode: null,
        bookingConfirmed: false,
        rentalStatus: '0',
        totalAmount: 6000,
        rentalDuration: 2,
        renteeLocation: [],
        createdAt: '2023-01-03T10:13:44.064Z',
        updatedAt: '2023-01-03T10:13:44.064Z',
        __v: 0,
      },
      {
        _id: '63b4002c18b68dee166f313b',
        renter: {
          _id: '63b2e16f5ea05e8e22a9831f',
          username: 'Muzammil',
          email: 'muzammilabbasi732@gmail.com',
          phone: '03032626732',
          isRenter: false,
          role: 'user',
          firebaseToken: '',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-02T13:51:43.534Z',
          updatedAt: '2023-01-02T13:51:43.534Z',
          __v: 0,
        },
        rentee: {
          _id: '63b3d897c8298e8717040848',
          username: 'Owais928',
          email: 'sp19bscs0007@maju.edu.pk',
          phone: '03323766916',
          isRenter: false,
          role: 'user',
          firebaseToken:
            'f8t7_cuvSj6L8l6Kz-Bp2U:APA91bGuTb8B5jFYp4XYZi-ml12QTpKvOizWaDEosbHT9P3ZYK3OjH_7Kt7XsWAgwLwbweJkOA5aJjOnTWgYIsDcfAnOVBxDH_rmhRxzbNkG6D3FpdqMBe9qbl0su1syhwUkpqzlRswZ',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-03T07:26:15.122Z',
          updatedAt: '2023-01-03T15:12:00.462Z',
          __v: 0,
        },
        vehicle: {
          pickupLocation: {
            type: 'Point',
            coordinates: [24.860198250184723, 67.07084356219261],
          },
          _id: '63b3d70885bb87e547044e8d',
          vehicleOwner: '63b2e16f5ea05e8e22a9831f',
          vehicleCategory: '63b2e2015ea05e8e22a98322',
          brand: 'CHANGAN',
          model: 'ALSVIN',
          year: '2021',
          registrationNumber: 'CPC-9696',
          vehicleType: 'SEDAN',
          isAvailable: false,
          isBooked: false,
          description: 'HONDA BRV 10/10 Condition ',
          noOfSeats: '4',
          fuelType: 'Petrol',
          noOfAirbags: '4',
          isAutomatic: true,
          noOfDoors: '4',
          isAircondition: false,
          images: [
            'http://localhost:8000/public/images/vehicles/changan-1672730376474-469717879.jpeg',
            'http://localhost:8000/public/images/vehicles/Changan-Alsvin-Lumiere-In-pakistan-1672730376479-984529555.jpeg',
          ],
          vehiclePapers: [
            'http://localhost:8000/public/images/vehicle-papers/vehicle-Registration-Card-1672730376503-558648591.jpeg',
          ],
          vehicleInsurance: [
            'http://localhost:8000/public/images/vehicle-insurance/vehicle-insurance-image-1672730376507-311210899.jpeg',
          ],
          selfDriveDailyCharges: 3000,
          approvalStatus: '2',
          reasonForRejection: '',
          averageRating: 0,
          createdAt: '2023-01-03T07:19:36.685Z',
          updatedAt: '2023-01-03T07:19:36.685Z',
          __v: 0,
        },
        startTime: '2023-01-24T10:00:08.000Z',
        endTime: '2023-01-26T10:00:08.000Z',
        startCode: null,
        endCode: null,
        bookingConfirmed: false,
        rentalStatus: '0',
        totalAmount: 6000,
        rentalDuration: 2,
        renteeLocation: [],
        createdAt: '2023-01-03T10:15:08.076Z',
        updatedAt: '2023-01-03T10:15:08.076Z',
        __v: 0,
      },
      {
        _id: '63b4010118b68dee166f3146',
        renter: {
          _id: '63b2e16f5ea05e8e22a9831f',
          username: 'Muzammil',
          email: 'muzammilabbasi732@gmail.com',
          phone: '03032626732',
          isRenter: false,
          role: 'user',
          firebaseToken: '',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-02T13:51:43.534Z',
          updatedAt: '2023-01-02T13:51:43.534Z',
          __v: 0,
        },
        rentee: {
          _id: '63b3d897c8298e8717040848',
          username: 'Owais928',
          email: 'sp19bscs0007@maju.edu.pk',
          phone: '03323766916',
          isRenter: false,
          role: 'user',
          firebaseToken:
            'f8t7_cuvSj6L8l6Kz-Bp2U:APA91bGuTb8B5jFYp4XYZi-ml12QTpKvOizWaDEosbHT9P3ZYK3OjH_7Kt7XsWAgwLwbweJkOA5aJjOnTWgYIsDcfAnOVBxDH_rmhRxzbNkG6D3FpdqMBe9qbl0su1syhwUkpqzlRswZ',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-03T07:26:15.122Z',
          updatedAt: '2023-01-03T15:12:00.462Z',
          __v: 0,
        },
        vehicle: {
          pickupLocation: {
            type: 'Point',
            coordinates: [24.860198250184723, 67.07084356219261],
          },
          _id: '63b3d70885bb87e547044e8d',
          vehicleOwner: '63b2e16f5ea05e8e22a9831f',
          vehicleCategory: '63b2e2015ea05e8e22a98322',
          brand: 'CHANGAN',
          model: 'ALSVIN',
          year: '2021',
          registrationNumber: 'CPC-9696',
          vehicleType: 'SEDAN',
          isAvailable: false,
          isBooked: false,
          description: 'HONDA BRV 10/10 Condition ',
          noOfSeats: '4',
          fuelType: 'Petrol',
          noOfAirbags: '4',
          isAutomatic: true,
          noOfDoors: '4',
          isAircondition: false,
          images: [
            'http://localhost:8000/public/images/vehicles/changan-1672730376474-469717879.jpeg',
            'http://localhost:8000/public/images/vehicles/Changan-Alsvin-Lumiere-In-pakistan-1672730376479-984529555.jpeg',
          ],
          vehiclePapers: [
            'http://localhost:8000/public/images/vehicle-papers/vehicle-Registration-Card-1672730376503-558648591.jpeg',
          ],
          vehicleInsurance: [
            'http://localhost:8000/public/images/vehicle-insurance/vehicle-insurance-image-1672730376507-311210899.jpeg',
          ],
          selfDriveDailyCharges: 3000,
          approvalStatus: '2',
          reasonForRejection: '',
          averageRating: 0,
          createdAt: '2023-01-03T07:19:36.685Z',
          updatedAt: '2023-01-03T07:19:36.685Z',
          __v: 0,
        },
        startTime: '2023-01-24T10:00:08.000Z',
        endTime: '2023-01-26T10:00:08.000Z',
        startCode: null,
        endCode: null,
        bookingConfirmed: false,
        rentalStatus: '0',
        totalAmount: 6000,
        rentalDuration: 2,
        renteeLocation: [],
        createdAt: '2023-01-03T10:18:41.967Z',
        updatedAt: '2023-01-03T10:18:41.967Z',
        __v: 0,
      },
      {
        _id: '63b401b318b68dee166f315c',
        renter: {
          _id: '63b2e16f5ea05e8e22a9831f',
          username: 'Muzammil',
          email: 'muzammilabbasi732@gmail.com',
          phone: '03032626732',
          isRenter: false,
          role: 'user',
          firebaseToken: '',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-02T13:51:43.534Z',
          updatedAt: '2023-01-02T13:51:43.534Z',
          __v: 0,
        },
        rentee: {
          _id: '63b3d897c8298e8717040848',
          username: 'Owais928',
          email: 'sp19bscs0007@maju.edu.pk',
          phone: '03323766916',
          isRenter: false,
          role: 'user',
          firebaseToken:
            'f8t7_cuvSj6L8l6Kz-Bp2U:APA91bGuTb8B5jFYp4XYZi-ml12QTpKvOizWaDEosbHT9P3ZYK3OjH_7Kt7XsWAgwLwbweJkOA5aJjOnTWgYIsDcfAnOVBxDH_rmhRxzbNkG6D3FpdqMBe9qbl0su1syhwUkpqzlRswZ',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-03T07:26:15.122Z',
          updatedAt: '2023-01-03T15:12:00.462Z',
          __v: 0,
        },
        vehicle: {
          pickupLocation: {
            type: 'Point',
            coordinates: [24.860198250184723, 67.07084356219261],
          },
          _id: '63b3d70885bb87e547044e8d',
          vehicleOwner: '63b2e16f5ea05e8e22a9831f',
          vehicleCategory: '63b2e2015ea05e8e22a98322',
          brand: 'CHANGAN',
          model: 'ALSVIN',
          year: '2021',
          registrationNumber: 'CPC-9696',
          vehicleType: 'SEDAN',
          isAvailable: false,
          isBooked: false,
          description: 'HONDA BRV 10/10 Condition ',
          noOfSeats: '4',
          fuelType: 'Petrol',
          noOfAirbags: '4',
          isAutomatic: true,
          noOfDoors: '4',
          isAircondition: false,
          images: [
            'http://localhost:8000/public/images/vehicles/changan-1672730376474-469717879.jpeg',
            'http://localhost:8000/public/images/vehicles/Changan-Alsvin-Lumiere-In-pakistan-1672730376479-984529555.jpeg',
          ],
          vehiclePapers: [
            'http://localhost:8000/public/images/vehicle-papers/vehicle-Registration-Card-1672730376503-558648591.jpeg',
          ],
          vehicleInsurance: [
            'http://localhost:8000/public/images/vehicle-insurance/vehicle-insurance-image-1672730376507-311210899.jpeg',
          ],
          selfDriveDailyCharges: 3000,
          approvalStatus: '2',
          reasonForRejection: '',
          averageRating: 0,
          createdAt: '2023-01-03T07:19:36.685Z',
          updatedAt: '2023-01-03T07:19:36.685Z',
          __v: 0,
        },
        startTime: '2023-01-18T10:20:15.000Z',
        endTime: '2023-01-21T10:20:15.000Z',
        startCode: null,
        endCode: null,
        bookingConfirmed: false,
        rentalStatus: '0',
        totalAmount: 9000,
        rentalDuration: 3,
        renteeLocation: [],
        createdAt: '2023-01-03T10:21:39.581Z',
        updatedAt: '2023-01-03T10:21:39.581Z',
        __v: 0,
      },
      {
        _id: '63b4023618b68dee166f3167',
        renter: {
          _id: '63b2e16f5ea05e8e22a9831f',
          username: 'Muzammil',
          email: 'muzammilabbasi732@gmail.com',
          phone: '03032626732',
          isRenter: false,
          role: 'user',
          firebaseToken: '',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-02T13:51:43.534Z',
          updatedAt: '2023-01-02T13:51:43.534Z',
          __v: 0,
        },
        rentee: {
          _id: '63b3d897c8298e8717040848',
          username: 'Owais928',
          email: 'sp19bscs0007@maju.edu.pk',
          phone: '03323766916',
          isRenter: false,
          role: 'user',
          firebaseToken:
            'f8t7_cuvSj6L8l6Kz-Bp2U:APA91bGuTb8B5jFYp4XYZi-ml12QTpKvOizWaDEosbHT9P3ZYK3OjH_7Kt7XsWAgwLwbweJkOA5aJjOnTWgYIsDcfAnOVBxDH_rmhRxzbNkG6D3FpdqMBe9qbl0su1syhwUkpqzlRswZ',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-03T07:26:15.122Z',
          updatedAt: '2023-01-03T15:12:00.462Z',
          __v: 0,
        },
        vehicle: {
          pickupLocation: {
            type: 'Point',
            coordinates: [24.860198250184723, 67.07084356219261],
          },
          _id: '63b3d70885bb87e547044e8d',
          vehicleOwner: '63b2e16f5ea05e8e22a9831f',
          vehicleCategory: '63b2e2015ea05e8e22a98322',
          brand: 'CHANGAN',
          model: 'ALSVIN',
          year: '2021',
          registrationNumber: 'CPC-9696',
          vehicleType: 'SEDAN',
          isAvailable: false,
          isBooked: false,
          description: 'HONDA BRV 10/10 Condition ',
          noOfSeats: '4',
          fuelType: 'Petrol',
          noOfAirbags: '4',
          isAutomatic: true,
          noOfDoors: '4',
          isAircondition: false,
          images: [
            'http://localhost:8000/public/images/vehicles/changan-1672730376474-469717879.jpeg',
            'http://localhost:8000/public/images/vehicles/Changan-Alsvin-Lumiere-In-pakistan-1672730376479-984529555.jpeg',
          ],
          vehiclePapers: [
            'http://localhost:8000/public/images/vehicle-papers/vehicle-Registration-Card-1672730376503-558648591.jpeg',
          ],
          vehicleInsurance: [
            'http://localhost:8000/public/images/vehicle-insurance/vehicle-insurance-image-1672730376507-311210899.jpeg',
          ],
          selfDriveDailyCharges: 3000,
          approvalStatus: '2',
          reasonForRejection: '',
          averageRating: 0,
          createdAt: '2023-01-03T07:19:36.685Z',
          updatedAt: '2023-01-03T07:19:36.685Z',
          __v: 0,
        },
        startTime: '2023-01-18T10:20:15.000Z',
        endTime: '2023-01-21T10:20:15.000Z',
        startCode: null,
        endCode: null,
        bookingConfirmed: false,
        rentalStatus: '0',
        totalAmount: 9000,
        rentalDuration: 3,
        renteeLocation: [],
        createdAt: '2023-01-03T10:23:50.141Z',
        updatedAt: '2023-01-03T10:23:50.141Z',
        __v: 0,
      },
      {
        _id: '63b4026318b68dee166f3172',
        renter: {
          _id: '63b2e16f5ea05e8e22a9831f',
          username: 'Muzammil',
          email: 'muzammilabbasi732@gmail.com',
          phone: '03032626732',
          isRenter: false,
          role: 'user',
          firebaseToken: '',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-02T13:51:43.534Z',
          updatedAt: '2023-01-02T13:51:43.534Z',
          __v: 0,
        },
        rentee: {
          _id: '63b3d897c8298e8717040848',
          username: 'Owais928',
          email: 'sp19bscs0007@maju.edu.pk',
          phone: '03323766916',
          isRenter: false,
          role: 'user',
          firebaseToken:
            'f8t7_cuvSj6L8l6Kz-Bp2U:APA91bGuTb8B5jFYp4XYZi-ml12QTpKvOizWaDEosbHT9P3ZYK3OjH_7Kt7XsWAgwLwbweJkOA5aJjOnTWgYIsDcfAnOVBxDH_rmhRxzbNkG6D3FpdqMBe9qbl0su1syhwUkpqzlRswZ',
          isVerified: true,
          verificationID: null,
          profilePicture: null,
          createdAt: '2023-01-03T07:26:15.122Z',
          updatedAt: '2023-01-03T15:12:00.462Z',
          __v: 0,
        },
        vehicle: {
          pickupLocation: {
            type: 'Point',
            coordinates: [24.860198250184723, 67.07084356219261],
          },
          _id: '63b3d70885bb87e547044e8d',
          vehicleOwner: '63b2e16f5ea05e8e22a9831f',
          vehicleCategory: '63b2e2015ea05e8e22a98322',
          brand: 'CHANGAN',
          model: 'ALSVIN',
          year: '2021',
          registrationNumber: 'CPC-9696',
          vehicleType: 'SEDAN',
          isAvailable: false,
          isBooked: false,
          description: 'HONDA BRV 10/10 Condition ',
          noOfSeats: '4',
          fuelType: 'Petrol',
          noOfAirbags: '4',
          isAutomatic: true,
          noOfDoors: '4',
          isAircondition: false,
          images: [
            'http://localhost:8000/public/images/vehicles/changan-1672730376474-469717879.jpeg',
            'http://localhost:8000/public/images/vehicles/Changan-Alsvin-Lumiere-In-pakistan-1672730376479-984529555.jpeg',
          ],
          vehiclePapers: [
            'http://localhost:8000/public/images/vehicle-papers/vehicle-Registration-Card-1672730376503-558648591.jpeg',
          ],
          vehicleInsurance: [
            'http://localhost:8000/public/images/vehicle-insurance/vehicle-insurance-image-1672730376507-311210899.jpeg',
          ],
          selfDriveDailyCharges: 3000,
          approvalStatus: '2',
          reasonForRejection: '',
          averageRating: 0,
          createdAt: '2023-01-03T07:19:36.685Z',
          updatedAt: '2023-01-03T07:19:36.685Z',
          __v: 0,
        },
        startTime: '2023-01-18T10:20:15.000Z',
        endTime: '2023-01-21T10:20:15.000Z',
        startCode: null,
        endCode: null,
        bookingConfirmed: false,
        rentalStatus: '0',
        totalAmount: 9000,
        rentalDuration: 3,
        renteeLocation: [],
        createdAt: '2023-01-03T10:24:35.575Z',
        updatedAt: '2023-01-03T10:24:35.575Z',
        __v: 0,
      },
    ],
    approved: [],
    rejected: [],
  };
  const [pending, setPending] = useState([]);
  const [approved, setApprove] = useState([]);
  const [rejected, setRejected] = useState([]);
 

  // useEffect(() => {
  //   setIsLoading(true);
  //   console.log("PENDING",Payload.pending)
    
  //   setPending(Payload.pending);
  //   setApprove(Payload.approved);
  //   setPending(Payload.rejected);
    
  // },[])

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getRentalVehicles(onSuccess,onFailure);
      // Do something when the screen is focused
      return (() => {
        setPending([]);
        setRejected([]);
        setApprove([]);
        setIsLoading(false);
      });
    }, [])
   );

  function bookingView() {
    switch (switchValue) {
      case 1:
        return (
          <View style={{height: '100%'}}>
            {isLoading ? (
              <BottomSheetSkelton />
            ) : pending.length < 1 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black'}}>
                  There are no Pending Vehicles
                </Text>
              </View>
            ) : (
              <View>
                <FlatList
                  data={pending}
                  contentContainerStyle={styles.contentContainer}
                  refreshing={true}
                  style={{height: '95%'}}
                  keyExtractor={key => {
                    return key._id;
                  }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <ListOfVehiclesItems
                      item={item}
                      onPressElement={() => console.log('first')}
                    />
                  )}
                />
              </View>
            )}
          </View>
        );
      case 2:
        return (
          <View style={{height: '100%'}}>
            {isLoading ? (
              <BottomSheetSkelton />
            ) : approved.length < 1 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black'}}>
                  There are no Approve Vehicle
                </Text>
              </View>
            ) : (
              <View>
                <FlatList
                  data={approved}
                  // renderItem={({item}) => (
                  //   <TouchableOpacity
                  //     onPress={() => {
                  //       console.log(item.vehicle.registrationNumber);
                  //     }}>
                  //     <Text style={{margin: 3, fontSize: 15}}>
                  //       {item.vehicle.registrationNumber}
                  //     </Text>
                  //     <Text style={{margin: 3, fontSize: 15}}>
                  //       {item.renter.username}
                  //     </Text>
                  //     <Text style={{margin: 3, fontSize: 15}}>
                  //       {item.renter.email}
                  //     </Text>
                  //   </TouchableOpacity>
                  // )}
                  contentContainerStyle={styles.contentContainer}
                  refreshing={true}
                  style={{height: '95%'}}
                  keyExtractor={key => {
                    return key._id;
                  }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    console.log('ITEM ->> ', item);
                    return (
                      <ListOfVehiclesItems
                        item={item}
                        onPressElement={() => console.log('first')}
                      />
                    );
                  }}
                />
              </View>
            )}
          </View>
        );
      case 3:
        return (
          <View style={{height: '100%'}}>
            {isLoading ? (
              <BottomSheetSkelton />
            ) : rejected.length < 1 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black'}}>
                  There are no Rejected Vehicle
                </Text>
              </View>
            ) : (
              <View>
                <FlatList
                  data={rejected}
                  // renderItem={({item}) => (
                  //   <TouchableOpacity
                  //     onPress={() => {
                  //       console.log(item.vehicle.registrationNumber);
                  //     }}>
                  //     <Text style={{margin: 3, fontSize: 15}}>
                  //       {item.vehicle.registrationNumber}
                  //     </Text>
                  //     <Text style={{margin: 3, fontSize: 15}}>
                  //       {item.renter.username}
                  //     </Text>
                  //     <Text style={{margin: 3, fontSize: 15}}>
                  //       {item.renter.email}
                  //     </Text>
                  //   </TouchableOpacity>
                  // )}
                  contentContainerStyle={styles.contentContainer}
                  refreshing={true}
                  style={{height: '95%'}}
                  keyExtractor={key => {
                    return key._id;
                  }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    console.log('ITEM ->> ', item);
                    return (
                      <ListOfVehiclesItems
                        item={item}
                        onPressElement={() => console.log('first')}
                      />
                    );
                  }}
                />
              </View>
            )}
          </View>
        );
    }
  }

  const onSuccess = data => {
    console.log("DATA ->> ",data)
    const {
      Payload: {pending,approved, rejected},
    } = data;

    setPending(pending);
    setApprove(approved);
    setRejected(rejected);
    setIsLoading(false);
  };

  const onFailure = () => {
    console.log('onFailure');
    setIsLoading(false);
  };

  return (
    <View
      style={{backgroundColor: 'white', flex: 1, paddingHorizontal: wp('2%')}}>
      {/* { */}
      {/* openCamera ? renderCamera() : */}
      <View>
        <View
          style={{
            // height: General_Styles.generalHeight / 4,
            marginVertical: hp('3%'),
            // paddingVertical:hp('5%'),
            // width: General_Styles.generalWidth,
            // backgroundColor: Colors,
            justifyContent: 'center',
          }}>
          <CustomSwitch
            selectionMode={1}
            option1="Pending"
            option2="Approved"
            option3="Rejected"
            Thirdbtn={true}
            onSelectSwitch={e => setSwitchValue(e)}
          />

          {bookingView()}
        </View>
      </View>
    </View>

    // <TabView
    //   lazy
    //   navigationState={{ index, routes }}
    //   renderScene={SceneMap({
    //     first: FirstRoute,
    //     second: SecondRoute,
    //   })}
    //   renderLazyPlaceholder={LazyPlaceholder}
    //   onIndexChange={setIndex}
    //   initialLayout={{width: Dimensions.get('window').width}}
    //   style={styles.container}
    // />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // backgroundColor: Colors,
  },
  Logo: {
    width: '70%',
    marginTop: 20,
    maxHeight: 200,
    maxWidth: 300,
  },
  title: {
    color: '#111111',
    fontSize: 40,
    fontWeight: 'bold',
    // alignSelf:'flex-start',
  },
  //   forgotpasstouchable:{

  //   },
  hairline: {
    backgroundColor: 'black',
    height: 1,
    width: 120,
  },
  forgotpasstitle: {
    color: '#EFB250',
  },
  memberJoinText: {
    flexDirection: 'row',
    marginTop: 15,
  },
  googleBtn: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#EEEEEE',
    borderRadius: 20,
    backgroundColor: '#F9F9F9',
    // backgroundColor: "white",
  },
  input: {
    marginTop: 10,
    padding: 18,
    backgroundColor: '#F9F9F9',
    width: '90%',
    //  color: 'blue',
    borderRadius: 20,
    //  borderColor:'blue',
    //  outline: "none"
  },
  contentContainer: {
    paddingBottom: hp('3%'),
    // height:hp('100%'),
    backgroundColor: Colors.White,
  },
});

export default ListOfVehicles;
