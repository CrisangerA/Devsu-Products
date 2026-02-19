import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ProductsStackParamsList } from '@navigation/config/routes';

export const useNavigationProducts = () =>
  useNavigation<NativeStackNavigationProp<ProductsStackParamsList>>();
