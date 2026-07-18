import 'package:flutter/material.dart';

class AppTheme {
  AppTheme._();

  static final light = ThemeData(
    useMaterial3: true,
    colorSchemeSeed: const Color(0xFF2E7D32),
    brightness: Brightness.light,
  );

  static final dark = ThemeData(
    useMaterial3: true,
    colorSchemeSeed: const Color(0xFF2E7D32),
    brightness: Brightness.dark,
  );
}
