#!/usr/bin/env python3

import os
import sys
import unittest
import importlib.machinery
import importlib.util

# Dynamically import decorpify since it lacks a .py extension
script_path = os.path.join(os.path.dirname(__file__), 'decorpify')
loader = importlib.machinery.SourceFileLoader("decorpify", script_path)
spec = importlib.util.spec_from_loader("decorpify", loader)
decorpify_module = importlib.util.module_from_spec(spec)
sys.modules["decorpify"] = decorpify_module
loader.exec_module(decorpify_module)

decorpify = decorpify_module.decorpify

class TestDecorpify(unittest.TestCase):
    def test_gerrit_review_standard(self):
        self.assertEqual(
            decorpify("https://chromium-review.corp.google.com/c/openscreen/+/6917871"),
            "https://chromium-review.googlesource.com/c/openscreen/+/6917871"
        )

    def test_gerrit_review_git_corp(self):
        self.assertEqual(
            decorpify("https://chromium-review.git.corp.google.com/c/openscreen/+/6917871"),
            "https://chromium-review.googlesource.com/c/openscreen/+/6917871"
        )

    def test_gerrit_review_strip_usp_search(self):
        self.assertEqual(
            decorpify("https://chromium-review.git.corp.google.com/c/openscreen/+/6917871?usp=search"),
            "https://chromium-review.googlesource.com/c/openscreen/+/6917871"
        )
        self.assertEqual(
            decorpify("https://chromium-review.corp.google.com/c/openscreen/+/6917871?foo=bar&usp=search"),
            "https://chromium-review.googlesource.com/c/openscreen/+/6917871?foo=bar"
        )

    def test_code_search(self):
        self.assertEqual(
            decorpify("https://source.corp.google.com/chromium/src"),
            "https://source.chromium.org/chromium/src"
        )
        self.assertEqual(
            decorpify("https://cs.corp.google.com/chromium/src"),
            "https://source.chromium.org/chromium/src"
        )

    def test_issue_tracker(self):
        self.assertEqual(
            decorpify("https://b.corp.google.com/issues/123456"),
            "https://crbug.com/123456"
        )
        self.assertEqual(
            decorpify("https://buganizer.corp.google.com/issues/123456"),
            "https://crbug.com/123456"
        )
        self.assertEqual(
            decorpify("https://issuetracker.corp.google.com/issues/123456"),
            "https://crbug.com/123456"
        )
        self.assertEqual(
            decorpify("http://b/123456"),
            "https://crbug.com/123456"
        )

    def test_inline_text(self):
        text = "Check out https://chromium-review.corp.google.com/c/123 and http://b/456 for details."
        expected = "Check out https://chromium-review.googlesource.com/c/123 and https://crbug.com/456 for details."
        self.assertEqual(decorpify(text), expected)

if __name__ == '__main__':
    unittest.main()
