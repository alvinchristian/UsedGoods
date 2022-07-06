import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updatePassword} from '../../../Redux/actions';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Header, Input, Button} from '../../../Components';
import {COLORS} from '../../../Utils';

const EditPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.appData.loginUser);
  const registerValidation = yup.object().shape({
    currentPassword: yup
      .string()
      .required('Current Password is Required!')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number!',
      ),
    newPassword: yup
      .string()
      .required('New Password is Required!')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number!',
      ),
    confirmPassword: yup
      .string()
      .required('Confirm Password is Required!')
      .oneOf([yup.ref('newPassword')], 'Confirm Password Must Match')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number!',
      ),
  });

  const goUpdate = useCallback(values => {
    dispatch(updatePassword(values, loginUser.access_token));
  }, []);

  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={registerValidation}
      onSubmit={values => goUpdate(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <SafeAreaView style={styles.Container}>
          <StatusBar
            backgroundColor={'transparent'}
            translucent
            barStyle={'dark-content'}
          />
          <Header title={'Edit Password'} navigation={navigation} />
          <Input
            icon={'lock-outline'}
            onChangeText={handleChange('currentPassword')}
            onBlur={handleBlur('currentPassword')}
            value={values.currentPassword}
            placeholder={'Current Password'}
            error={errors.currentPassword}
            secureTextEntry={true}
          />
          <Input
            icon={'lock-reset'}
            onChangeText={handleChange('newPassword')}
            onBlur={handleBlur('newPassword')}
            value={values.newPassword}
            placeholder={'New Password'}
            error={errors.newPassword}
            secureTextEntry={true}
          />
          <Input
            icon={'lock-check-outline'}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            placeholder={'Confirm Password'}
            error={errors.confirmPassword}
            secureTextEntry={true}
          />
          <Button caption={'Update'} onPress={handleSubmit} />
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default EditPassword;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
